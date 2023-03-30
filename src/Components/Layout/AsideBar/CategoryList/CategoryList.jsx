import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../../../context'
import MyTitle from '../../../UI/MyTitle/MyTitle'
import AddCategory from './AddCategory/AddCategory'
import ListItem from '../ListItem/ListItem'
import './categoryList.scss'

const CategoryList = () => {
  const { setTab, setCategory, tabItems, timeLine, openSideMenu } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()

  const chooseCategory = e => {
    location.pathname === '/Profile.jsx' && navigate('/')
    setTab(e.target.innerText)
    setCategory(e.target.innerText)
    window.matchMedia('(max-width: 1280px)').matches && openSideMenu(false)
  }

  const titleStyles = {
    fontSize: '24px',
    lineHeight: '33px',
    letterSpacing: '0.03em',
  }

  if (window.matchMedia('(max-width: 1400px)').matches) {
    titleStyles.fontSize = '20px'
    titleStyles.lineHeight = '28px'
  }

  return (
    <div className='asideBar__category'>
      <MyTitle {...titleStyles}>Category</MyTitle>
      <div className='categoriesContainer'>
        <ul className='category__list'>
          {tabItems.tabs.map(element => (
            <li key={element.title}>
              <ListItem onClick={chooseCategory}>{element.title}</ListItem>
            </li>
          ))}
        </ul>
      </div>
      {!timeLine.past && <AddCategory />}
    </div>
  )
}

export default CategoryList
