import { Injectable } from "@nestjs/common";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import * as firebaseConfig from "./firebaseConfig";

@Injectable()
export class DatabaseService {
  protected readonly app: FirebaseApp;
  protected readonly firestore: Firestore;

  public constructor() {
    this.app = initializeApp(firebaseConfig.config);
    this.firestore = getFirestore(this.app);
  }

  public getFirestore(): Firestore {
    return this.firestore;
  }
}
