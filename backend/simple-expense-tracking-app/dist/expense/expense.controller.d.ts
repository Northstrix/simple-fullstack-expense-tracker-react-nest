import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    addRecord(expenseData: Partial<Expense>): Promise<Expense>;
    getAllRecords(): Promise<Expense[]>;
}
