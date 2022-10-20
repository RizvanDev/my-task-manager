import React from 'react'
import './categoryList.scss'
import MyTitle from '../../MyTitle/MyTitle'
import AddItem from '../../UI/AddItem/AddItem'
import ListItem from '../ListItem/ListItem'

const CategoryList = props => {
  return (
    <div className='asideBar__category'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        Category
      </MyTitle>
      <div className='categoriesContainer'>
        <ul className='category__list'>
          {props.tabItems.map(element => (
            <li key={element.title}>
              <ListItem onClick={() => props.setTab(element.title)}>{element.title}</ListItem>
            </li>
          ))}
        </ul>
      </div>
      <AddItem tabItems={props.tabItems} setTabItem={props.setTabItem} setTab={props.setTab} />
    </div>
  )
}

export default CategoryList
