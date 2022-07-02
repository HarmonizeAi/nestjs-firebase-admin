import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseApp } from '@firebase/app-types';

@Injectable()
export class FirebaseDatabaseService {
  constructor(public readonly app: admin.app.App) {}

  get database() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.database();
  }
}
