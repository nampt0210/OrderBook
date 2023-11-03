import { ICleanedFeed, IHashedOrderRow, ITickSizeGrouping, OrderDelta, OrderDeltaWithTime, OrderRowUntotal } from "src/types/feed.type";
import { countDecimalDigits } from "./number";

export const cleanFeedData = (
  deltaArray: OrderDelta[],
  dateStamp: Date,
  decimalPlace: number
) => {
  const deltaHash = deltaArray.reduce(
    (acc: { [key: number]: OrderDeltaWithTime }, curr) => {
      const [price, size] = curr;
      acc[price] = {
        price: price.toFixed(decimalPlace),
        size,
        date: dateStamp,
      };
      return acc;
    },
    {}
  );
  return deltaHash;
}

export const groupByTickSize = ({
  bids,
  asks,
  ticker,
  tickSize,
  dateStamp,
  decimalPlace,
}: ITickSizeGrouping) => {
  const newMaxPriceSize = asks
    .concat(bids)
    .filter((d) => d[1])
    .map((d) => d[1])
    .reduce((acc, curr) => acc + curr, 0);
  const orderBookSnapshot: ICleanedFeed = {
    ticker,
    asks: groupTickRows(
      tickSize,
      cleanFeedData(asks, dateStamp, decimalPlace)
    ),
    bids: groupTickRows(
      tickSize,
      cleanFeedData(bids, dateStamp, decimalPlace)
    ),
    maxPriceSize: newMaxPriceSize,
  };
  return orderBookSnapshot;
};

export const groupTickRows = (
  tickSize: number,
  orderDeltas: { [key: number]: OrderRowUntotal }
): IHashedOrderRow => {
  const decimalPlace = countDecimalDigits(tickSize);
  const roundDownToTickDecimals = (
    input: number,
    tickSize: number,
    decimalPlace: number
  ) => {
    if (decimalPlace === 0) {
      return Math.floor(input);
    }
    // round down input to the decimal of the tickSize
    const roundedToDecimalOfTickSize =
      Math.floor(input * Math.pow(10, decimalPlace)) /
      Math.pow(10, decimalPlace);
    // Divide the rounded by the floor(tickSize)
    const roundedDown = parseFloat(
      (
        Math.floor(
          parseFloat((roundedToDecimalOfTickSize / tickSize).toFixed(10))
        ) * tickSize
      ).toFixed(decimalPlace)
    );
    return roundedDown;
  };

  let total = 0;
  const grouping = Object.keys(orderDeltas)
    .map((key: string) => orderDeltas[parseFloat(key)])
    .sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price);
    })
    .filter((k) => k)
    .map((delta) => {
      const { price, size } = delta;
      total += size;
      return {
        price: roundDownToTickDecimals(
          parseFloat(price),
          tickSize,
          decimalPlace
        ).toFixed(decimalPlace),
        size,
        total,
      };
    })
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.price]: curr,
      };
    }, {});
  return grouping;
};

