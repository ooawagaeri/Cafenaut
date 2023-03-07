import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.interface';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { DatabaseService } from "../firebase/database.service";

@Injectable()
export class ReviewService {
  constructor(private databaseService: DatabaseService) {
  }

  public async create(post: ReviewModel): Promise<void> {
    const db = this.databaseService.getFirestore();

    const docRef = doc(collection(db, "reviews"));
    console.log(`New Review ID: ${docRef.id}`);
    await setDoc(doc(db, 'reviews', docRef.id), post);
  }

  public async getAll(): Promise<ReviewModel[]> {
    const db = this.databaseService.getFirestore();

    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const arr = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      arr.push(doc.data());
    });

    return arr;
  }

  public async get(review_id): Promise<ReviewModel> {
    const db = this.databaseService.getFirestore();

    const docRef = doc(db, 'reviews', review_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      throw new HttpException('Not Found.', HttpStatus.NOT_FOUND);
    }

    return docSnap.data() as ReviewModel;
  }
}
