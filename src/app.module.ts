import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// const uri = process.env.DATABASE_URL;
@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>('MONGODB_URL'),
			}),
		}),
		ConfigModule.forRoot(),
		CoffeesModule,
		// MongooseModule.forRoot(
		// console.log(process.env.MONGODB_URL),
		// 'mongodb+srv://mdsohanurrahman63:7sHyCzwXjEli269m@cluster0.gynn8im.mongodb.net/coffees?retryWrites=true&w=majority'
		// ),
		CoffeeRatingModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

// DATABASE_URL='mongodb+srv://mdsohanurrahman63:7sHyCzwXjEli269m@cluster0.gynn8im.mongodb.net/coffees?retryWrites=true&w=majority',
