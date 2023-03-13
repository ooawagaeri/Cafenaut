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
      console.log(snapshot.data());
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
      cafes.push(doc.data());
    });
    return cafes;
  }
}
