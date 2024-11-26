import { Portfolio } from "./portfolio";
import { Transaction } from "./transaction";

export class PlacingOrder {
    id!: number;
    symbol!: string;
    qty!: number;
    price!: number;
    date!: Date;
    note?: string;
    param!: string;
    duration!: string;
    stopLoss?: number;
    takeProfit?: number;
    leverage?: number;    
    // Specific Fields For Bonds
    faceValue?: number;
    couponRate?: number;
    maturityDate?: Date;
    //  Specific Fields For Options
    strikePrice?: number;
    expirationDate?: Date;
    //  Specific Fields For Commodities
    contractSize?: number;
    expiryDate?: Date;
    //  Specific Fields For Mutual Funds and ETFs
    nav?: number;


    // Enums
    tradeType!: TradeType;
    orderType!: OrderType;
    transacType!: TransacType;
    status!: Status;

    transactions!: Transaction[];  
    portfolio!: Portfolio;  // to ge the id of portfolio           
}
    
export enum TradeType {
    STOCKS = 'STOCKS',
    OPTIONS = 'OPTIONS',
    BONDS = 'BONDS',
    COMMODITIES = 'COMMODITIES',
    FOREX = 'FOREX',
    MUTUAL_FUNDS = 'MUTUAL_FUNDS',
    ETF = 'ETF',
    CRYPTO='CRYPTO'
}

export enum OrderType {
    MARKET = 'MARKET',
    LIMIT = 'LIMIT',
    STOP_LIMIT = 'STOP_LIMIT',
    TRAILING_STOP = 'TRAILING_STOP'
}

export enum TransacType {
    BUY = 'BUY',
    SELL = 'SELL',
    SHORT = 'SHORT',
    COVER = 'COVER',
    CALL = 'CALL',
    PUT = 'PUT'
}

export enum Status {
    OPEN = 'OPEN',
    FILLED = 'FILLED',
    CANCELLED = 'CANCELLED',
    PENDING = 'PENDING'
}
