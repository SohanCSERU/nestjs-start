import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';

@Injectable()
export class CoffeesService {
	constructor(
		@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
		@InjectModel(Event.name) private readonly eventModel: Model<Event>,
		@InjectConnection() private readonly connection: Connection,
		@Inject(COFFEE_BRANDS) coffeeBrands: string[],
	) {
		console.log(coffeeBrands);
	}

	findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		return this.coffeeModel.find().skip(offset).limit(limit).exec();
	}

	async findOne(id: string) {
		// throw 'A random error';
		const coffee = this.coffeeModel.findOne({ _id: id }).exec();
		if (!coffee) {
			throw new HttpException(
				`Coffee #${id} not found`,
				HttpStatus.NOT_FOUND,
			);
		}
		return coffee;
	}
	create(createCoffeeDto: CreateCoffeeDto) {
		const coffee = new this.coffeeModel(createCoffeeDto);
		return coffee.save();
	}

	async update(id: string, updateCoffeeDto: any) {
		const existingCoffee = await this.coffeeModel
			.findOneAndUpdate(
				{ _id: id },
				{ $set: updateCoffeeDto },
				{ new: true },
			)
			.exec();
		if (!existingCoffee) {
			throw new NotFoundException(`Coffee #${id} not found!`);
		}
		return existingCoffee;
	}

	async remove(id: string) {
		console.log('Removing one coffee from the database');
		const coffee = await this.coffeeModel.findByIdAndDelete({ _id: id });
		return coffee;
	}

	async recommendCoffee(coffee: Coffee) {
		const session = await this.connection.startSession();
		session.startTransaction();

		try {
			coffee.recommendations++;

			const recommendEvent = new this.eventModel({
				name: 'Recommend_coffee',
				type: 'coffee',
				payload: { coffeeId: coffee.id },
			});
			await recommendEvent.save({ session });
			await coffee.save({ session });
		} catch (err) {
			await session.abortTransaction();
		} finally {
			session.endSession();
		}
	}
}
