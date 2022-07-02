import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthenticationService {
  constructor(public readonly app: admin.app.App) {}

  get auth() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.auth();
  }
}
