import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
export declare class ExpenseService {
    private expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
    addRecord(expenseData: Partial<Expense>): Promise<Expense>;
    getAllRecords(): Promise<Expense[]>;
}
