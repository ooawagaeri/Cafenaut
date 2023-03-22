import { Injectable } from '@nestjs/common';
import { CustomClassifier } from './custom_classifier';
import * as firebase from 'firebase-admin';
import { ReviewModel } from '../review/review.interface';
import { Classification, CLASSIFY_MAP } from './classification.interface';

const CONNOISSEUR_FILE = 'apps/backend/src/classifier/connoisseur_model.json';
const DRINK_FILE = 'apps/backend/src/classifier/coffee_tea_model.json';

@Injectable()
export class ClassifierService {
  private connoisseurClassifier: CustomClassifier;
  private drinkClassifier: CustomClassifier;

  constructor() {
    this.connoisseurClassifier = new CustomClassifier(CONNOISSEUR_FILE);
    this.drinkClassifier = new CustomClassifier(DRINK_FILE);
  }

  trainConnoisseur(text: string | string[], body: string): void {
    this.connoisseurClassifier.trainClassifier(text, body);
    this.connoisseurClassifier.saveModel();
  }

  trainDrink(text: string | string[], body: string): void {
    this.drinkClassifier.trainClassifier(text, body);
    this.drinkClassifier.saveModel();
  }

  retrieveConnoisseur(text: string): string | undefined {
    return this.connoisseurClassifier.predictClassifier(text);
  }

  retrieveDrink(text: string): string | undefined {
    return this.drinkClassifier.predictClassifier(text);
  }

  async retrieveUserClassification(uid: string): Promise<Classification> {
    const reviewsSnapshot = await firebase
      .firestore()
      .collection('reviews')
      .where('user_uid', '==', uid)
      .get();

    const all_class: Classification[] = [];
    reviewsSnapshot.forEach((reviewDoc) => {
      const review = reviewDoc.data() as ReviewModel;
      all_class.push(this.classifyReview(review));
    });

    return all_class.reduce((previous, current, i, arr) =>
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
        ? previous
        : current
    );
  }

  private classifyReview(post: ReviewModel): Classification {
    const general_text = [post.body,
      post.aspects.coffee.free_text,
      post.aspects.tea.free_text]
      .join('. ');

    const connoisseurType = this.retrieveConnoisseur(general_text);
    const drinkType = this.retrieveDrink(general_text);

    if (connoisseurType == undefined || drinkType == undefined) {
      return Classification.UNWEIGHTED;
    }

    return CLASSIFY_MAP.get([connoisseurType, drinkType].join('_'))
  }
}
