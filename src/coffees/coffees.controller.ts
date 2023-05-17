import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    // const { limit, offset } = paginationQuery;
    // return `This action returns all coffees Limit: ${limit}, offset: ${offset} !`;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log('id: ' + id);
    // return `This action return ${id} coffees`;
    return this.coffeesService.findOne(id);
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return `This action delete ${id} coffee`;
  //   // return this.coffeesService.remove(id);
  // }
}
