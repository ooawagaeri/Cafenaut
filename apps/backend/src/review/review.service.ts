import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.interface';
import { AggregatedRating } from '../rating/aggregatedRating';
import * as firebase from "firebase-admin";

@Injectable()
export class ReviewService {
  public async create(post: ReviewModel): Promise<string> {
    // Generate aggregated rating for all user types
    const aggregatedRating = new AggregatedRating(post);
    post.rating = aggregatedRating.get_aggreagated_ratings();

    post.reports = 0;
    const res = await firebase.firestore().collection("reviews").add(post);
    console.log(`New Review ID: ${res.id}`);

    // TODO: Calculate overall rating for the Cafe and store it.

    return res.id;
  }

  public async getAll(): Promise<ReviewModel[]> {
    const querySnapshot = await firebase.firestore().collection("reviews").get();
    const arr = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      arr.push(doc.data());
    });

    return arr;
  }

  public async get(review_id): Promise<ReviewModel> {
    const docSnap = await firebase.firestore().collection("reviews").doc(review_id).get();

    if (docSnap.exists) {
      console.log('Review data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such Review!');
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return docSnap.data() as ReviewModel;
  }

  public async reportReview(review_id): Promise<void> {
    const reviewRef = firebase.firestore().collection("reviews")
      .doc(review_id);
    reviewRef.get().then(async (docSnap) => {
      if (docSnap.exists) {
        const review = docSnap.data() as ReviewModel;
        const toUpdate = {
          reports: review.reports + 1,
        };
        await reviewRef.update(toUpdate);
        console.log("Review reports updated.")
      } else {
        console.log('No such Review!');
        throw new HttpException('Not Found.', HttpStatus.NOT_FOUND);
      }
    })
  }
}
