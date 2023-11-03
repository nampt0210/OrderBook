import React from 'react'
import OrderTable from '../orderTable'
import { styles } from './style'
import useLogic from './useLogic'

const OrderBook: React.FC = () => {
  const { data } = useLogic()

  if (!data) {
    return null
  }

  return (
    <section className={styles.container}>
      <div className={styles.topbar}>
        <h1 style={{ color: 'white' }}>{data.ticker}</h1>
      </div>
      <div className={styles.inner}>
        <OrderTable
          title="Asks"
          rows={data.asks}
          maxPriceSize={data.maxPriceSize}
          askOrBid={'ask'}
          ticker={data.ticker}
        />
        <OrderTable
          title="Bids"
          rows={data.bids}
          maxPriceSize={data.maxPriceSize}
          askOrBid={'bid'}
          ticker={data.ticker}
        />
      </div>
    </section>
  )
}

export default OrderBook
