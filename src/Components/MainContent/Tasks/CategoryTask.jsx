import React, { useState } from 'react'
import MyTitle from '../../MyTitle/MyTitle'

const CategoryTask = ({ category, idx, tab, setTab, listItems, setListItem }) => {
  const [modal, setModal] = useState(false)

  const clConfigBtn = ['category__configModal']

  if (modal) clConfigBtn.push('open')

  const removeCategory = category => {
    setTab(listItems[idx - 1] || listItems[1])
    return setListItem(listItems.filter(e => e !== category))
  }

  return (
    <div className={tab === category ? 'category__container active' : 'category__container'}>
      <div className='category__title'>{category}</div>
      <div className='category__activeTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Active tasks
        </MyTitle>
      </div>
      <div className='category__completedTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Completed tasks
        </MyTitle>
      </div>
      <button
        type='button'
        className='category__configBtn'
        title='configuration'
        onClick={() => setModal(!modal)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
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
          onClick={() => removeCategory(category)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default CategoryTask
