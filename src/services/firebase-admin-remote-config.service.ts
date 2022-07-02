import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseRemoteConfigService {
  constructor(public readonly app: admin.app.App) {}

  get remoteConfig() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.remoteConfig();
  }
}
