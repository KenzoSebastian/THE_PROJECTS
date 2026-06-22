import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealthStatus() {
    return {
      status: 'OK',
      statusCode: 200,
      message: 'Backend Service Engine is running safely',
      timestamp: new Date().toISOString(),
    };
  }
}
