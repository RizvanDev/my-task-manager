import React from 'react'
import './categoriesConfig.scss'

const CategoriesConfig = ({ modal, removeCategory }) => {
  const clConfigBtn = ['category__configModal']

  if (modal) clConfigBtn.push('open')

  return (
    <div className={clConfigBtn.join(' ')}>
      <div className='category__filter'>
        <span>filtered by:</span>
        <select>
          <option value='new'>newest first</option>
          <option value='old'>oldest first</option>
        </select>
      </div>
      <button
        type='button'
        className='category__removeBtn'
        title='remove this category'
        onClick={() => removeCategory()}>
        Remove
      </button>
    </div>
  )
}

export default CategoriesConfig
