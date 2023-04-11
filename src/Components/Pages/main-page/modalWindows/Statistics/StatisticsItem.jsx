import { useEffect } from 'react'
import useValue from '../../../../../hooks/useValue'
import cl from './statistics.module.scss'

const StatisticsItem = ({ itemName, quantity }) => {
  let [count, setCount] = useValue(0)

  useEffect(() => {
    count < quantity && setTimeout(() => setCount(count + 1), 20)
  })

  useEffect(() => setCount(0), [quantity])

  return (
    <div className={cl.item}>
      <span>{itemName}</span>
      <div className={cl.itemInfo}>
        <div className={cl.count}>{count}</div>
        <span>{itemName ? 'Tasks' : 'Categories'}</span>
      </div>
    </div>
  )
}

export default StatisticsItem
