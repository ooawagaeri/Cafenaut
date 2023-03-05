import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.interface';
import { initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import * as firebaseConfig from '../firebase/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig.config);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Injectable()
export class ReviewService {
  public async create(post: ReviewModel): Promise<void> {
    await setDoc(doc(db, 'reviews', post.user_uid + ',' + post.title), post);
  }

  public async getAll(): Promise<ReviewModel[]> {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    let arr = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      arr.push(doc.data());
    });

    return arr;
  }

  public async get(review_id): Promise<ReviewModel> {
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
