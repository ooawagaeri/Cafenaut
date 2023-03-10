import { Injectable } from '@nestjs/common';
import * as firebase from "firebase-admin";
import { User } from "./user.interface";

@Injectable()
export class UserService {
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }

  async getUserDetails(uid: string): Promise<User> {
    const snapshot = await firebase.firestore().collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get()
    const userDetails = snapshot.docs[0].data();
    return {
      uid: "",
      name: userDetails.name,
      email: userDetails.email
    };
  }
}
