import React from 'react'
import { IOrderTable } from './types'
import { styles } from './style'

const OrderTable = ({
  title,
  rows,
  maxPriceSize,
  askOrBid,
  ticker
}: IOrderTable) => {
  const askOrBidOptions = {
    ask: { key: 'ask', color: 'red' },
    bid: { key: 'bid', color: 'green' }
  }
  const displayRows = Object.keys(rows)
    .map((key) => rows[key as unknown as number])
    .filter((k) => k)

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.title}>
          <th>{`${title}`}</th>
        </tr>
        <tr className={styles.heading}>
          <th className={styles.head}>Price</th>
          <th className={styles.head}>Size</th>
          <th className={styles.head}>Total</th>
        </tr>
      </thead>
      <tbody>
        {displayRows.map((row) => {
          const { price, size, total } = row
          const colorSpriteWidth = total / maxPriceSize
          return (
            <tr
              key={`${askOrBid}-${price}-${ticker}`}
              className={styles.ghostRow}
            >
              {askOrBid === askOrBidOptions.ask.key ? (
                <tr className={styles.colorSprite}>
                  <td className={styles.uncolored(colorSpriteWidth)}></td>
                  <td
                    className={styles.colored(
                      colorSpriteWidth,
                      askOrBidOptions[askOrBid].color
                    )}
                  ></td>
                </tr>
              ) : (
                <tr className={styles.colorSprite}>
                  <td
                    className={styles.colored(
                      colorSpriteWidth,
                      askOrBidOptions[askOrBid].color
                    )}
                  ></td>
                  <td className={styles.uncolored(colorSpriteWidth)}></td>
                </tr>
              )}
              <tr className={styles.row}>
                <td className={styles.cell}>{price}</td>
                <td className={styles.cell}>{size}</td>
                <td className={styles.cell}>{total}</td>
              </tr>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrderTable
