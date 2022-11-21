import React, { useContext } from 'react'
import './categoryList.scss'
import MyTitle from '../../MyTitle/MyTitle'
import AddItem from './AddItem/AddItem'
import ListItem from '../ListItem/ListItem'
import { Context } from '../../../context'

const CategoryList = () => {
  const { setTab, setCategory, tabItems } = useContext(Context)

  const chooseCategory = e => {
    setTab(e.target.innerText)
    setCategory(e.target.innerText)
  }

  return (
    <div className='asideBar__category'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        Category
      </MyTitle>
      <div className='categoriesContainer'>
        <ul className='category__list'>
          {tabItems.map(element => (
            <li key={element.title}>
              <ListItem onClick={chooseCategory}>{element.title}</ListItem>
            </li>
          ))}
        </ul>
      </div>
      <AddItem />
    </div>
  )
}

export default CategoryList
