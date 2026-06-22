import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TescoModule } from './tesco/tesco.module';

@Module({
  imports: [TescoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
