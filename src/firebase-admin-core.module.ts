import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAdminModuleAsyncOptions, FirebaseAdminModuleOptions } from './firebase-admin.interface';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constant';
import {
  FirebaseAuthenticationService,
  FirebaseMessagingService,
  FirebaseRemoteConfigService,
  FirebaseDatabaseService,
  FirebaseFirestoreService,
  FirebaseStorageService,
} from './services';
import { AppOptions } from 'firebase-admin';

const PROVIDERS = [
  FirebaseAuthenticationService,
  FirebaseMessagingService,
  FirebaseRemoteConfigService,
  FirebaseDatabaseService,
  FirebaseFirestoreService,
  FirebaseStorageService,
];
const EXPORTS = [...PROVIDERS];

function getAppOrInitialize(options: FirebaseAdminModuleOptions) {
  try {
    const app = admin.app(options.appName);
    //if app exists it will get here, if does not, it will throw
    return app;
  } catch (error) {
    const { firestoreSettings, appName, ...appOptions } = options
    const app = admin.initializeApp(appOptions, appName);

    if (firestoreSettings != null) {
      app.firestore().settings( {
        ...options.firestoreSettings
      })
    }

    return app;
  }
}

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    };

    const app = getAppOrInitialize(options);
    const providers = this.createProviders(app);

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
  }

  private static createProviders(app: admin.app.App): Provider<any>[] {
    return PROVIDERS.map<Provider>((providerService) => ({
      provide: providerService,
      useFactory: () => new providerService(app),
    }));
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions: Provider<any> = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory as any,
      inject: options.inject || [],
    };

    const providers = this.createAsyncProviders();

    const module: DynamicModule = {
      module: FirebaseAdminCoreModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
    return module
  }

  private static createAsyncProviders(): Provider<any>[] {
    return PROVIDERS.map<Provider>((providerService) => ({
      provide: providerService,
      useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = getAppOrInitialize(options);
        return new providerService(app);
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    }));
  }
}
