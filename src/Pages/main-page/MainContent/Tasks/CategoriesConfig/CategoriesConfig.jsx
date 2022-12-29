import React from 'react'
import Select from '../../../../../Components/UI/Select/Select'
import './categoriesConfig.scss'

const CategoriesConfig = ({ modal, timeLine, category, setSortType, removeCategory }) => {
  const clConfigBtn = ['category__configModal']

  if (modal) clConfigBtn.push('open')

  const selectStyles = {
    marginLeft: '10px',
    padding: '3px',
    borderRadius: '15px',
    fontSize: '14px',
    cursor: 'pointer',
  }

  return (
    <div className={clConfigBtn.join(' ')}>
      <div className='category__filter'>
        <span>filter by:</span>
        <Select
          styles={selectStyles}
          options={[{ title: 'newest first' }, { title: 'oldest first' }]}
          value={category.sortingType}
          onChange={e => setSortType(e.target.value)}
        />
      </div>
      <button
        type='button'
        style={{ display: !timeLine.past ? 'block' : 'none' }}
        className='category__removeBtn'
        title='remove this category'
        onClick={removeCategory}>
        Remove
      </button>
    </div>
  )
}

export default CategoriesConfig
