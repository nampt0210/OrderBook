import { IHashedOrderRow } from "src/types/feed.type"

export interface IOrderTable {
  title: string
  rows: IHashedOrderRow
  maxPriceSize: number
  askOrBid: 'ask' | 'bid'
  ticker: string
}