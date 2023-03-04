import Select from '../../../../../Components/UI/Select/Select'
import MainBtn from '../../../../../Components/UI/MainBtn/MainBtn'
import './categoriesConfig.scss'

const CategoriesConfig = props => {
  const { darkMode, categoryConfigModal, category, setSortType, timeLine, handleDeleteCategory } =
    props

  const selectStyles = {
    padding: '3px',
    backgroundColor: 'transparent',
    borderRadius: '15px',
    fontSize: '14px',
    color: `${darkMode ? '#f9f9f9' : '#282846'}`,
    cursor: 'pointer',
    option: { color: '#282846' },
  }

  return (
    <div className={categoryConfigModal ? 'category__configModal open' : 'category__configModal'}>
      <div className='category__filter'>
        {window.matchMedia('(min-width: 768px)').matches && <span>sorting by:</span>}
        <Select
          styles={selectStyles}
          options={[{ title: 'newest first' }, { title: 'oldest first' }]}
          value={category.sortingType}
          onChange={e => setSortType(e.target.value)}
        />
      </div>
      <MainBtn
        className='category__removeBtn'
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
