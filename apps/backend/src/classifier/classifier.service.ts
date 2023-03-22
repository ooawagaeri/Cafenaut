import { Injectable } from "@nestjs/common";
import { CustomClassifier } from "./custom_classifier";

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

  retrieveConnoisseur(text: string): string | void {
    return this.connoisseurClassifier.predictClassifier(text);
  }

  retrieveDrink(text: string): string | void {
    return this.drinkClassifier.predictClassifier(text);
  }
}
