import { useContext } from 'react'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import './deleteCategoryModal.scss'

const DeleteCategoryModal = ({ removeCategory }) => {
  const { darkMode, modals, openModals, tab } = useContext(Context)

  const closeTaskModal = () => openModals({ ...modals, deleteCategoryModal: false })

  const deleteCategory = () => {
    removeCategory()
    closeTaskModal()
  }

  return (
    <MyModal darkMode={darkMode} opened={modals.deleteCategoryModal} closeModal={closeTaskModal}>
      <span className='deleteCategoryModal__title'>delete {tab} category?</span>
      <div className='deleteCategoryModal__container'>
        <MainBtn className='deleteCategoryModal__btn' type='button' onClick={deleteCategory}>
          Yes
        </MainBtn>
        <MainBtn className='deleteCategoryModal__btn' type='button' onClick={closeTaskModal}>
          No
        </MainBtn>
      </div>
    </MyModal>
  )
}

export default DeleteCategoryModal
