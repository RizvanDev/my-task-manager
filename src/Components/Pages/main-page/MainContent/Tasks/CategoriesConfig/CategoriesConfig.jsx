import Select from '../../../../../../Components/UI/Select/Select'
import MainBtn from '../../../../../../Components/UI/MainBtn/MainBtn'
import cl from './categoriesConfig.module.scss'

const CategoriesConfig = props => {
  const { categoryConfigModal, category, setSortType, timeLine, handleDeleteCategory } = props

  const categoryConfigClassnames = categoryConfigModal
    ? [cl.categoryConfig, cl.open].join(' ')
    : [cl.categoryConfig]

  return (
    <div className={categoryConfigClassnames}>
      <div className={cl.sorting}>
        {window.matchMedia('(min-width: 768px)').matches && <span>sorting by:</span>}
        <Select
          className={[cl.select]}
          options={[{ title: 'newest first' }, { title: 'oldest first' }]}
          value={category.sortingType}
          onChange={e => setSortType(e.target.value)}
        />
      </div>
      <MainBtn
        className={cl.removeBtn}
        type='button'
        style={{ display: !timeLine.past ? 'flex' : 'none' }}
        title='remove this category'
        onClick={handleDeleteCategory}>
        Remove
      </MainBtn>
    </div>
  )
}

export default CategoriesConfig
