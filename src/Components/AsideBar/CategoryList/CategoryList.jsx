import React from 'react'
import './categoryList.scss'
import MyTitle from '../../MyTitle/MyTitle'
import AddItem from './AddItem/AddItem'
import ListItem from '../ListItem/ListItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
        <TransitionGroup component='ul' className='category__list'>
          {props.tabItems.map(element => (
            <CSSTransition
              key={element.title}
              nodeRef={element.nodeRef}
              timeout={500}
              mountOnEnter
              unmountOnExit
              classNames='listItem'>
              <li ref={element.nodeRef}>
                <ListItem onClick={chooseCategory}>{element.title}</ListItem>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
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
