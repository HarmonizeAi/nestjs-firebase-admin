import { Test } from '@nestjs/testing';
import { FirebaseAdminModule } from './firebase-admin.module';
import { FirebaseFirestoreService } from './services';
import * as admin from "firebase-admin"

describe('FirebaseAdminModule', () => {
  describe('forRoot run', () => {
    it('should create a module', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRoot({
            projectId: 'nestjs-firebase-admin-for-test',
            appName: 'app1'
          }),
        ],
      }).compile();

      const fireService1 = await moduleRef.resolve(FirebaseFirestoreService);
      const settings1 = (fireService1.firestore as any)?._settings;
      expect(settings1.projectId).toEqual('nestjs-firebase-admin-for-test');
    });

    it('should create different modules for each project', async () => {
      const moduleRef1 = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRoot({
            projectId: 'project-1',
            appName: 'project1',
          }),
        ],
      }).compile();
      const fireService1 = await moduleRef1.resolve(FirebaseFirestoreService);
      const settings1 = (fireService1.firestore as any)?._settings;
      expect(settings1.projectId).toEqual('project-1');

      const moduleRef2 = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRoot({
            projectId: 'project-2',
            appName: 'project2',
          }),
        ],
      }).compile();
      const fireService2 = await moduleRef2.resolve(FirebaseFirestoreService);
      const settings2 = (fireService2.firestore as any)?._settings;
      expect(settings2.projectId).toEqual('project-2');
    });
  });

  describe('forRootAsync run', () => {
    it('should create a module', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRootAsync({
            useFactory: () => ({
              projectId: 'nestjs-firebase-admin-for-test',
              appName: 'app1-async',
            }),
          }),
        ],
      }).compile();

      const fireService1 = await moduleRef.resolve(FirebaseFirestoreService);
      const settings1 = (fireService1.firestore as any)?._settings;
      expect(settings1.projectId).toEqual('nestjs-firebase-admin-for-test');
    });

    it('should create different modules for each project', async () => {
      const moduleRef1 = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRootAsync({
            useFactory: () => ({
              projectId: 'project-async-1',
              appName: 'project1-async',
            }),
          }),
        ],
      }).compile();
      const fireService1 = await moduleRef1.resolve(FirebaseFirestoreService);
      const settings1 = (fireService1.firestore as any)?._settings;
      expect(settings1.projectId).toEqual('project-async-1');

      const moduleRef2 = await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRootAsync({
            useFactory: () => ({
              projectId: 'project-async-2',
              appName: 'project2-async',
            }),
          }),
        ],
      }).compile();
      const fireService2 = await moduleRef2.resolve(FirebaseFirestoreService);
      const settings2 = (fireService2.firestore as any)?._settings;
      expect(settings2.projectId).toEqual('project-async-2');
    });
  });
});
