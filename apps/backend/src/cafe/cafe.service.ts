import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { CafeModel } from './cafe.interface';

@Injectable()
export class CafeService {
  async getCafe(id: string): Promise<CafeModel> {
    const snapshot = await firebase
      .firestore()
      .collection('cafes')
      .doc(id)
      .get();
    if (snapshot.exists) {
      snapshot.data();
    } else {
      console.log('No such Cafe!');
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return snapshot.data() as CafeModel;
  }

  async getAllCafes(): Promise<CafeModel[]> {
    const cafes = [];
    const snapshot = await firebase.firestore().collection('cafes').get();
    snapshot.forEach((doc) => {
      const details = {
        ...doc.data(),
        id: doc.id,
      };
      cafes.push(details);
    });
    return cafes;
  }

  async create(post: CafeModel): Promise<void> {
    const add_cafe = await firebase
      .firestore()
      .collection('cafes')
      .add(post);
    console.log(`New Cafe ID: ${add_cafe.id}`);
  }
}
