const CategoryHeader = ({ categoryTitle, categoryConfigModal, setCategoryConfigModal }) => {
  return (
    <div>
      <div className='category__title'>{categoryTitle}</div>

      <button
        type='button'
        className='category__configBtn'
        title='configuration'
        onClick={() => setCategoryConfigModal(!categoryConfigModal)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  )
}

export default CategoryHeader
