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
    userDetails.uid = snapshot.id;
    return userDetails as User;
  }

  async getAllUserDetails(): Promise<User[]> {
    const arr_of_users = [];
    const snapshot = await firebase.firestore().collection('users').get();
    snapshot.forEach((user) => {
      const details = user.data();
      details.uid = user.id;
      arr_of_users.push(details);
    });
    return arr_of_users;
  }

  async getSubsetUserDetails(uids: string[]): Promise<User[]> {
    const all_users = this.getAllUserDetails();
    const filtered_users = [];

    (await all_users).forEach((user) => {
      if (uids.find((uid) => uid == user.uid)) {
        filtered_users.push(user);
      }
    });
    return filtered_users;
  }

  async addFollow(own_uid: string, following_uid: string): Promise<void> {
    const userRef = await firebase.firestore().collection('users').doc(own_uid);
    const following_userRef = await firebase
      .firestore()
      .collection('users')
      .doc(following_uid);

    await userRef.update({
      following: FieldValue.arrayUnion(following_uid),
    });

    await following_userRef.update({
      followers: FieldValue.arrayUnion(own_uid),
    });
  }

  async unfollow(own_uid: string, following_uid: string): Promise<void> {
    const userRef = await firebase.firestore().collection('users').doc(own_uid);
    const following_userRef = await firebase
      .firestore()
      .collection('users')
      .doc(following_uid);

    await userRef.update({
      following: FieldValue.arrayRemove(following_uid),
    });

    await following_userRef.update({
      followers: FieldValue.arrayRemove(own_uid),
    });
  }
}
