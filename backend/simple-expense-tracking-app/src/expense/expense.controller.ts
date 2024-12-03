import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async addRecord(@Body() expenseData: Partial<Expense>): Promise<Expense> {
    return this.expenseService.addRecord(expenseData);
  }

  @Get()
  async getAllRecords(): Promise<Expense[]> {
    return this.expenseService.getAllRecords();
  }
}