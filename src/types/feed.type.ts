export type OrderDeltaWithTime = {
  price: string;
  size: number;
  date: Date;
};

export type OrderRow = {
  price: string;
  size: number;
  total: number;
};

export type OrderDelta = [number, number];

export type OrderRowUntotal = {
  price: string;
  size: number;
  total?: number;
  date?: Date;
};

export interface IRawFeed {
  product_id: string;
  numLevels: number;
  feed: string;
  asks: { [key: number]: OrderDeltaWithTime };
  bids: { [key: number]: OrderDeltaWithTime };
}

export interface ICleanedFeed {
  ticker: string;
  asks: IHashedOrderRow;
  bids: IHashedOrderRow;
  maxPriceSize: number;
}

export interface IHashedOrderRow {
  [key: number]: OrderRow;
}

export interface IFeedSnapshot {
  product_id: string;
  numLevels: number;
  feed: string;
  bids: OrderDelta[];
  asks: OrderDelta[];
}

export interface ITickSizeGrouping {
  bids: OrderDelta[];
  asks: OrderDelta[];
  ticker: string;
  tickSize: number;
  dateStamp: Date;
  decimalPlace: number;
}