import { useEffect } from 'react'
import useValue from '../../../../../hooks/useValue'

const StatisticsItem = ({ itemName, quantity }) => {
  let [count, setCount] = useValue(0)

  useEffect(() => {
    count < quantity && setTimeout(() => setCount(count + 1), 20)
  })

  useEffect(() => setCount(0), [quantity])

  return (
    <div className='statistics__item'>
      <span>{itemName}</span>
      <div className='statistics__item-info'>
        <div className='statistics__item-count'>{count}</div>
        <span>{itemName ? 'Tasks' : 'Categories'}</span>
      </div>
    </div>
  )
}

export default StatisticsItem
