import { User } from './user';
import { Transaction } from './transaction';
import { Holding } from './holding';

export class Portfolio {
    id!: number;
    totVal!: number;
    dateCreated!: Date;
    accVal: number = 99000.000;
    buyPow!: number;
    cash!: number;    
    tdyChange?: number;
    annReturn?: number;
    totGainLoss?: number;
    
    user!: User;
    transactions!: Transaction[];
    holdings!: Holding[];
}
