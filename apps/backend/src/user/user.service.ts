import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
const { FieldValue } = require('firebase-admin/firestore');
import { User } from './user.interface';

@Injectable()
export class UserService {
  async getUserDetails(uid: string): Promise<User> {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    const userDetails = snapshot.data();
    return userDetails as User;
  }

  async addFollow(own_uid: string, following_uid: string): Promise<void> {
    const userRef = await firebase.firestore().collection('users').doc(own_uid);
    await userRef.update({
      following: FieldValue.arrayUnion(following_uid),
    });

    const following_userRef = await firebase.firestore().collection('users').doc(following_uid);
    await following_userRef.update({
      followers: FieldValue.arrayUnion(own_uid),
    });
  }

  async unfollow(own_uid: string, following_uid: string): Promise<void> {
    const userRef = await firebase.firestore().collection('users').doc(own_uid);
    await userRef.update({
      following: FieldValue.arrayRemove(following_uid),
    });

    const following_userRef = await firebase.firestore().collection('users').doc(following_uid);
    await following_userRef.update({
      followers: FieldValue.arrayRemove(own_uid),
    });
  }
}
