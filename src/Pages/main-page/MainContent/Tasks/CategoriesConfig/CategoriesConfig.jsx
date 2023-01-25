import React from 'react'
import Select from '../../../../../Components/UI/Select/Select'
import './categoriesConfig.scss'

const CategoriesConfig = props => {
  const clConfigBtn = ['category__configModal']

  if (props.modal) clConfigBtn.push('open')

  const selectStyles = {
    padding: '3px',
    backgroundColor: 'transparent',
    borderRadius: '15px',
    fontSize: '14px',
    color: `${props.darkMode ? '#f9f9f9' : '#282846'}`,
    cursor: 'pointer',
    option: { color: '#282846' },
  }

  return (
    <div className={clConfigBtn.join(' ')}>
      <div className='category__filter'>
        {window.innerWidth >= 768 && <span>filter by:</span>}
        <Select
          styles={selectStyles}
          options={[{ title: 'newest first' }, { title: 'oldest first' }]}
          value={props.category.sortingType}
          onChange={e => props.setSortType(e.target.value)}
        />
      </div>
      <button
        type='button'
        style={{ display: !props.timeLine.past ? 'block' : 'none' }}
        className='category__removeBtn'
        title='remove this category'
        onClick={props.removeCategory}>
        Remove
      </button>
    </div>
  )
}

export default CategoriesConfig
