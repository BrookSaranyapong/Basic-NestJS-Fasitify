import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHomeAPI', () => {
    it('should return "v1.0.0"', () => {
      const data = {
        version: 'v1.0.0',
        message: 'NestJS API running...',
      };
      expect(appController.getHomeAPI()).toEqual(data);
    });
  });

  describe('getHelloAPI', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello NestJS!');
    });
  });
});
