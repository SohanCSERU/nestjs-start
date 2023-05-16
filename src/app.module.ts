import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot(
      'mongodb+srv://mdsohanurrahman63:7sHyCzwXjEli269m@cluster0.gynn8im.mongodb.net/?retryWrites=true&w=majority"',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
