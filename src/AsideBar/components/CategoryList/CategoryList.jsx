import React, { useState } from 'react'
import './categoryList.scss'
import MyTitle from '../../../MyTitle/MyTitle'
import AddItem from '../../../UI/AddItem/AddItem'
import ListItem from '../ListItem/ListItem'

const defaultListItems = ['Home', 'Family', 'Work', 'Sport']

const CategoryList = () => {
  const [listItems, setListItem] = useState(defaultListItems)

  return (
    <div className='asideBar__category'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        Category
      </MyTitle>
      <ul className='category__list'>
        {listItems.map(element => (
          <li key={element}>
            <ListItem>{element}</ListItem>
          </li>
        ))}
      </ul>
      <AddItem setListItem={setListItem} listItems={listItems} />
    </div>
  )
}

export default CategoryList
