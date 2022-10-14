import React from 'react'
import './categoryList.scss'
import MyTitle from '../../MyTitle/MyTitle'
import AddItem from '../../UI/AddItem/AddItem'
import ListItem from '../ListItem/ListItem'

const CategoryList = ({ listItems, setListItem, tab, setTab }) => {
  return (
    <div className='asideBar__category'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        Category
      </MyTitle>
      <ul className='category__list'>
        {listItems.map(element => (
          <li key={element}>
            <ListItem onClick={() => setTab((tab = element))}>{element}</ListItem>
          </li>
        ))}
      </ul>
      <AddItem listItems={listItems} setListItem={setListItem} setTab={setTab} />
    </div>
  )
}

export default CategoryList
