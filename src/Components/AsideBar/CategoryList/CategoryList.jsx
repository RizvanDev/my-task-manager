import React from 'react'
import './categoryList.scss'
import MyTitle from '../../MyTitle/MyTitle'
import AddItem from './AddItem/AddItem'
import ListItem from '../ListItem/ListItem'

const CategoryList = props => {
  const chooseCategory = e => {
    props.setTab(e.target.innerText)
    props.setCategory(e.target.innerText)
  }

  return (
    <div className='asideBar__category'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        Category
      </MyTitle>
      <div className='categoriesContainer'>
        <ul className='category__list'>
          {props.tabItems.map(element => (
            <li key={element.title}>
              <ListItem onClick={chooseCategory}>{element.title}</ListItem>
            </li>
          ))}
        </ul>
      </div>
      <AddItem
        tabItems={props.tabItems}
        setTabItem={props.setTabItem}
        setTab={props.setTab}
        setCategory={props.setCategory}
      />
    </div>
  )
}

export default CategoryList
