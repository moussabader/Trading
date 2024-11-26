import { Portfolio } from "./portfolio";

export class Holding {
    id!: number;
    symbol!: string;
    name!: string;
    qty!: number;
    avgPrice!: number;
    curntPrice!: number;
    mktVal!: number;
    acquisitionDate!: Date;

    portfolio!: Portfolio;
}
