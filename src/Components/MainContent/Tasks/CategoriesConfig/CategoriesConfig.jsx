import React from 'react'
import Select from '../../../UI/Select/Select'
import './categoriesConfig.scss'
import useValue from '../../../../hooks/useValue'

const CategoriesConfig = ({ modal, removeCategory }) => {
  const [selectValue, , selectOnChange] = useValue('newest first')

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
          value={selectValue}
          onChange={selectOnChange}
        />
      </div>
      <button
        type='button'
        className='category__removeBtn'
        title='remove this category'
        onClick={removeCategory}>
        Remove
      </button>
    </div>
  )
}

export default CategoriesConfig
