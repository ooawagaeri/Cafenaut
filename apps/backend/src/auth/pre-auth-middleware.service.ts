import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { ServiceAccount } from "firebase-admin";
import * as firebase from 'firebase-admin';
import * as serviceAccount from "./firebaseServiceAccount.json";

const firebase_params: ServiceAccount = {
  projectId: serviceAccount.project_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
}

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private defaultApp: firebase.app.App;
  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: "https://fir-auth-bd895.firebaseio.com"
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
        .then(async decodedToken => {
          req['user'] = {
            email: decodedToken.email,
            uid: decodedToken.uid,
          };
          next();
        }).catch(error => {
        console.error(error);
        this.accessDenied(req.url, res);
      });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    });
  }
}
