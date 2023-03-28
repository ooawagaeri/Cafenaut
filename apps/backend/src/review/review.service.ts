import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.interface';
import { AggregatedRating } from '../rating/aggregatedRating';
import * as firebase from 'firebase-admin';

@Injectable()
export class ReviewService {
  public async create(post: ReviewModel): Promise<string> {
    // Generate aggregated rating for all user types
    const aggregatedRating = new AggregatedRating();
    post.rating = aggregatedRating.generate_review_rating(post);
    post.reports = 0;
    const add_review = await firebase
      .firestore()
      .collection('reviews')
      .add(post);
    console.log(`New Review ID: ${add_review.id}`);

    // Calculate overall rating for the Cafe and store it in Cafe.
    const get_all_reviews = await firebase
      .firestore()
      .collection('reviews')
      .where('cafe_id', '==', post.cafe_id)
      .get();
    if (get_all_reviews.empty) {
      console.log(`FAILED getting all reviews from Cafe: ${post.cafe_id}`);
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      console.log(`Getting all reviews from Cafe: ${post.cafe_id}`);
    }
    const arr_of_review_ratings = [];
    get_all_reviews.forEach((review) => {
      const r = review.data() as ReviewModel;
      arr_of_review_ratings.push(r.rating);
    });
    const new_cafe_rating = aggregatedRating.generate_cafe_rating(
      arr_of_review_ratings
    );
    await firebase.firestore().collection('cafes').doc(post.cafe_id).update({
      rating: new_cafe_rating,
    });
    console.log(`Updated cafe: ${post.cafe_id}`);

    return add_review.id;
  }

  public async getAll(): Promise<ReviewModel[]> {
    const querySnapshot = await firebase
      .firestore()
      .collection('reviews')
      .get();
    const arr = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data());
    });
    return this.sortReviewsByDate(arr);
  }

  sortReviewsByDate(reviews: any[]) {
    // If you are wondering why is there a '+' before new
    // https://stackoverflow.com/questions/40248643/typescript-sort-by-date-not-working
    return reviews.sort((review_a: ReviewModel, review_b: ReviewModel) => {
      return +new Date(review_b.created_at) - +new Date(review_a.created_at);
    });
  }

  public async get(review_id): Promise<ReviewModel> {
    const docSnap = await firebase
      .firestore()
      .collection('reviews')
      .doc(review_id)
      .get();

    if (docSnap.exists) {
      console.log('Review data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such Review!');
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return docSnap.data() as ReviewModel;
  }

  public async getByCafe(cafe_id): Promise<ReviewModel[]> {
    const reviewsSnapshot = await firebase
      .firestore()
      .collection('reviews')
      .where('cafe_id', '==', cafe_id)
      .get();

    const reviews = [];
    reviewsSnapshot.forEach((reviewDoc) => {
      const review = reviewDoc.data() as ReviewModel;
      reviews.push(review);
    });
    return reviews;
  }

  public async reportReview(review_id): Promise<void> {
    const reviewRef = firebase.firestore().collection('reviews').doc(review_id);
    reviewRef.get().then(async (docSnap) => {
      if (docSnap.exists) {
        const review = docSnap.data() as ReviewModel;
        const toUpdate = {
          reports: review.reports + 1,
        };
        await reviewRef.update(toUpdate);
        console.log('Review reports updated.');
      } else {
        console.log('No such Review!');
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    });
  }
}
