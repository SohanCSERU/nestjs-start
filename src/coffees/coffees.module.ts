/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, Injectable } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { EventSchema } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'mongoose';
import { Tea, TeaSchema } from './entities/tea.entity';
import { ConfigModule } from '@nestjs/config';

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}
// class MockCoffeesService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }
@Module({
	imports: [
		// ConfigModule,
		MongooseModule.forFeature([
			{
				name: Coffee.name,
				schema: CoffeeSchema,
			},
			{
				name: Event.name,
				schema: EventSchema,
			},
			{
				name: 'Tea',
				schema: CoffeeSchema,
			},
		]),
	],
	controllers: [CoffeesController],
	providers: [
		CoffeesService,
		{
			provide: COFFEE_BRANDS,
			useFactory: async (connection: Connection): Promise<string[]> => {
				const coffeeBrand = await Promise.resolve([
					'buddy brew',
					'nescafe',
				]);
				console.log('[!] async Factory!');
				return coffeeBrand;
			},
		},
		// {
		//   provide: ConfigService,
		//   useClass:
		//     process.env.NODE_ENV === 'development'
		//        DevelopmentConfigService
		//       : ProductionConfigService,
		// },
		// CoffeeBrandsFactory,
		// {
		//   provide: COFFEE_BRANDS,
		//   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
		//     brandsFactory.create(),
		//   inject: [CoffeeBrandsFactory],
		// },
	],
	exports: [CoffeesService],
})
export class CoffeesModule {}
