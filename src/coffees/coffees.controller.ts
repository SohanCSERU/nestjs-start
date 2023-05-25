import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService) {}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		// return `This action returns all coffees Limit: ${limit}, offset: ${offset} !`;
		return this.coffeesService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		console.log('id: ' + id);
		return this.coffeesService.findOne(id);
		// return this.coffeesService.findOne(id);
	}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		console.log(createCoffeeDto);
		return this.coffeesService.create(createCoffeeDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
		// console.log(body);
		// return `This action update ${id} coffees`;
		return this.coffeesService.update(id, updateCoffeeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		// console.log('Inside Delete Route');
		// return `This action delete ${id} coffee`;
		return this.coffeesService.remove(id);
	}
}
