import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

// const uri = process.env.DATABASE_URL;
@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot(
      'mongodb+srv://mdsohanurrahman63:7sHyCzwXjEli269m@cluster0.gynn8im.mongodb.net/coffees?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// DATABASE_URL='mongodb+srv://mdsohanurrahman63:7sHyCzwXjEli269m@cluster0.gynn8im.mongodb.net/coffees?retryWrites=true&w=majority',
