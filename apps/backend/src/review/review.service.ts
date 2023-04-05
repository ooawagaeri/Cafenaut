import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.interface';
import { AggregatedRating } from '../rating/aggregatedRating';
import * as firebase from 'firebase-admin';
import { CafePinModel } from "../cafe/cafe.interface";
import { PorterStemmer, WordTokenizer } from "natural";

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
      arr.push(doc.data());
    });
    return this.sortReviewsByDate(arr);
  }

  sortReviewsByDate(reviews: ReviewModel[]) {
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

  public async getCafePins(cafes): Promise<CafePinModel[]> {
    const cafePins = []
    for (const cafe of cafes) {
      const cafePin = await this.getCafePin(cafe);
      cafePins.push(cafePin);
    }
    return cafePins;
  }

  private async getCafePin(cafe): Promise<CafePinModel> {
    const reviews = await this.getByCafe(cafe.id);
    // Average authenticity
    const authScores = reviews.map((r) => r.authenticity);
    const authTotal = authScores.reduce((a, b) => a + b, 0);
    return {
      ...cafe,
      popularity: reviews.length,
      authenticity: authTotal / authScores.length,
    };
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

  private normalizeStringToStemTokens(text: string) {
    const tokenizer = new WordTokenizer();
    const content = tokenizer.tokenize(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, ''));
    return content.map(word => PorterStemmer.stem(word));
  }

  public async updateKeyTerms(review_id): Promise<void> {
    const reviewRef = firebase.firestore().collection('reviews').doc(review_id);
    reviewRef.get().then(async (docSnap) => {
      if (docSnap.exists) {
        const review = docSnap.data() as ReviewModel;
        const content_arr = [review.title, review.body, review.aspects.coffee.free_text,
          review.aspects.tea.free_text, review.aspects.ambience.free_text,
          review.aspects.ambience.lighting, review.aspects.ambience.vibe,
          review.aspects.price.free_text, review.aspects.work_friendly.free_text,
          review.aspects.cuisine.free_text, review.aspects.speciality.free_text,
          review.aspects.amenities.free_text, review.aspects.pet.free_text
        ];

        const stemmedContent = this.normalizeStringToStemTokens(content_arr.join(' '));
        const toUpdate = {
          search_terms: [...new Set(stemmedContent)],
        };
        await reviewRef.update(toUpdate);
        console.log('Review search terms updated.');
      } else {
        console.log('No such Review!');
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    });
  }

  public async search(queryText: string, reviewToSearch: ReviewModel): Promise<ReviewModel[]> {
    // Converts review boolean-fields to binary
    function makeBinaryCompare(review: ReviewModel) {
      const stringBinary = [
        review.aspects.coffee.beans.arabica,
        review.aspects.coffee.beans.excelsa,
        review.aspects.coffee.beans.liberica,
        review.aspects.coffee.beans.robusta,
        review.aspects.coffee.milk.low_fat,
        review.aspects.coffee.milk.almond,
        review.aspects.coffee.milk.oat,
        review.aspects.coffee.milk.soy,
        review.aspects.coffee.non_caffeinated,
        review.aspects.tea.tea_leaves.black,
        review.aspects.tea.tea_leaves.green,
        review.aspects.tea.tea_leaves.oolong,
        review.aspects.tea.tea_leaves.pu_erh,
        review.aspects.tea.tea_leaves.white,
        review.aspects.tea.milk.low_fat,
        review.aspects.tea.milk.almond,
        review.aspects.tea.milk.oat,
        review.aspects.tea.milk.soy,
        review.aspects.ambience.alfresco,
        review.aspects.work_friendly.charging_ports,
        review.aspects.work_friendly.wifi,
        review.aspects.price.student,
        review.aspects.price.elderly,
        review.aspects.cuisine.serve_food,
        review.aspects.speciality.present,
        review.aspects.pet.friendly,
      ].map((item) => {
        const value = item === undefined ? false : item
        return value.toString() === 'true' ? '1' : '0'
      }).join('');
      return parseInt(stringBinary, 2)
    }

    const searchBinaryCompare = makeBinaryCompare(reviewToSearch);
    // Empty query, return all
    if (queryText === "" && searchBinaryCompare === 0) {
      return await this.getAll();
    }

    let arrayResults: ReviewModel[];
    const setResults = new Set<ReviewModel>();
    // Filter reviews based on text
    if (queryText !== "") {
      const reviewRef = firebase.firestore().collection('reviews');

      const setIds = new Set<string>();
      const stemmedQueryTexts = this.normalizeStringToStemTokens(queryText);

      if (stemmedQueryTexts.length == 1) {
        // Get all docs
        const reviewSnapshot = await reviewRef
          .where('search_terms', 'array-contains', stemmedQueryTexts[0])
          .get();
        reviewSnapshot.docs.forEach(doc => {
          setResults.add(doc.data() as ReviewModel);
        });
      } else {
        // Get overlapping docs
        for (const stemmedQueryText of stemmedQueryTexts) {
          const reviewSnapshot = await reviewRef
            .where('search_terms', 'array-contains', stemmedQueryText)
            .get();
          reviewSnapshot.docs.forEach(doc => {
            if (setIds.has(doc.id)) {
              setResults.add(doc.data() as ReviewModel)
            } else {
              setIds.add(doc.id);
            }
          });
        }
      }

      arrayResults = Array.from(setResults);
    } else {
      arrayResults = await this.getAll();
    }

    // Filter reviews based on boolean-fields
    if (searchBinaryCompare > 0) {
      arrayResults = arrayResults.filter((value) => {
        const binaryCompare = makeBinaryCompare(value);
        const overlap = binaryCompare & searchBinaryCompare;
        return overlap == searchBinaryCompare;
      });
    }

    return this.sortReviewsByDate(arrayResults);
  }
}
