import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseFirestoreService {
  constructor(public readonly app: admin.app.App) {}

  get firestore() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.firestore();
  }
}
