import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense/expense.entity';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'expenses.sqlite',
      entities: [Expense],
      synchronize: true,
    }),
    ExpenseModule,
  ],
})
export class AppModule {}