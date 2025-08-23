import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHomeAPI() {
    return {
      version: 'v1.0.0',
      message: 'NestJS API running...',
    };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
