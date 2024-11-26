import { PlacingOrder } from "./placing-order";
import { Portfolio } from "./portfolio";

export class Transaction {

  id!: number;
  symbol!: string;
  price!: number;
  quantity!: number;
  date!: Date;
  totalAmount!: number;
  descp?: string;
  commiss?: number;
  dividende?: number;

  portfolio!: Portfolio;
  placingOrder!: PlacingOrder;
            
}

export enum OrderType {
    LIMIT = 'LIMIT',
    MARKET = 'MARKET',
    STOP = 'STOP',
  }

  export enum TradeType {
    BUY = 'BUY',
    SELL = 'SELL',
  }