import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import AddItem from './AddItem/AddItem'
import ListItem from '../ListItem/ListItem'
import './categoryList.scss'

const CategoryList = () => {
  const { setTab, setCategory, tabItems, timeLine } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()

  const chooseCategory = e => {
    if (location.pathname === '/Profile.jsx') navigate('/')
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
          {tabItems.tasks.map(element => (
            <li key={element.title}>
              <ListItem onClick={chooseCategory}>{element.title}</ListItem>
            </li>
          ))}
        </ul>
      </div>
      {!timeLine.past ? <AddItem /> : ''}
    </div>
  )
}

export default CategoryList
