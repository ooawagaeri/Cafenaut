import * as firebase from "firebase-admin";
import { SentimentAnalyser } from "./sentiment";
import { SpamAnalyser } from "./spam";
import { ChatGptAnalyser } from "./chatgpt";
import { Injectable } from "@nestjs/common";
import { ReviewModel } from "../review/review.interface";

const MAX_SENTI = 1;
const MAX_RATING = 5;
const MIN_RATING = 1;

@Injectable()
export class AuthenticityService {
  private readonly sentimentAnalyser: SentimentAnalyser;
  private readonly spamAnalyser: SpamAnalyser;
  private readonly chatGptAnalyser: ChatGptAnalyser;

  constructor() {
    this.sentimentAnalyser = new SentimentAnalyser();
    this.spamAnalyser = new SpamAnalyser();
    this.chatGptAnalyser = new ChatGptAnalyser();
  }

  public async calculateAllAspects(reviewId: string): Promise<void> {
    const reviewRef = firebase.firestore().collection("reviews").doc(reviewId);
    // Details to set
    await reviewRef.get().then(async (docSnapshot) => {
      if (docSnapshot.exists) {
        const review = docSnapshot.data() as ReviewModel;
        review.sentiment = await this.sentimentAnalyser.analysePost(review);
        review.spam = await this.spamAnalyser.analysePost(review);
        review.chat_gpt = await this.chatGptAnalyser.analysePost(review);
        review.authenticity = AuthenticityService.findAuthenticity(review)

        const toUpdate = {
          sentiment: review.sentiment,
          spam: review.spam,
          chat_gpt: review.chat_gpt,
          authenticity: review.authenticity,
        };
        await reviewRef.update(toUpdate);
        console.log("Review score updated.")
      } else {
        console.log("Review does not exist.")
      }
    });
  }

  public async calculateOnlyAuthenticity(reviewId: string): Promise<void> {
    const reviewRef = firebase.firestore().collection("reviews")
      .doc(reviewId);
    const toUpdate = {
      authenticity: 0,
    };
    reviewRef.get().then(async (docSnapshot) => {
      if (docSnapshot.exists) {
        const review = docSnapshot.data() as ReviewModel;
        toUpdate.authenticity = AuthenticityService.findAuthenticity(review)
        await reviewRef.update(toUpdate);
        console.log("Review authenticity updated.")
      } else {
        console.log("Review does not exist.")
      }
    });
  }

  private static findAuthenticity(review: ReviewModel) {
    // Assume user classification is unweighted -- fair weights
    const ratingSenti = AuthenticityService
      .findRatingSentiment(review.rating.unweighted, review.sentiment)

    // When review is reported, treat as normal until >= 3
    let reportScore;
    if (review.reports < 2) {
      reportScore = 1;
    } else {
      reportScore = Math.log2(review.reports)
    }
    return (1 - review.spam) * (1 - review.chat_gpt) * (1 - ratingSenti) / reportScore;
  }

  private static findRatingSentiment(rating: number, sentiment: number): number {
    let score;
    if (sentiment < 0) {
      score = (rating - MIN_RATING) * -sentiment;
    } else {
      score = (MAX_RATING - rating) * sentiment;
    }
    return score / ((MAX_RATING - MIN_RATING) * MAX_SENTI);
  }
}
