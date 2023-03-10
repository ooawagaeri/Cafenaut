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

  public async calculate(reviewId: string): Promise<void> {
    const reviewRef = firebase.firestore().collection("reviews")
      .doc(reviewId);
    // Details to set
    const toUpdate = {
      sentiment: 0,
      spam: 0,
      chat_gpt: 0,
      authenticity: 0,
    };
    reviewRef.get().then(async (docSnapshot) => {
      if (docSnapshot.exists) {
        const review = docSnapshot.data() as ReviewModel;
        toUpdate.sentiment = await this.sentimentAnalyser.analysePost(review);
        toUpdate.spam = await this.spamAnalyser.analysePost(review);
        toUpdate.chat_gpt = await this.chatGptAnalyser.analysePost(review);

        // Assume user classification is coffee connoisseur
        // and equal weightage of sus-ness
        const ratingSenti = AuthenticityService
          .calculateRatingSentiment(review.rating.connoisseur_coffee, toUpdate.sentiment)
        toUpdate.authenticity = (1 - toUpdate.spam) * (1 - toUpdate.chat_gpt) * (1 - ratingSenti);

        await reviewRef.update(toUpdate);
        console.log("Review score updated.")
      } else {
        console.log("Review does not exist.")
      }
    });
  }

  private static calculateRatingSentiment(rating: number, sentiment: number): number {
    let score;
    if (sentiment < 0) {
      score = (rating - MIN_RATING) * -sentiment;
    } else {
      score = (MAX_RATING - rating) * sentiment;
    }
    return score / ((MAX_RATING - MIN_RATING) * MAX_SENTI);
  }
}
