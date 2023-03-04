import React from 'react'
import Input from '../../../../UI/Input/Input'
import MainBtn from '../../../../UI/MainBtn/MainBtn'

const InputContainer = React.forwardRef((props, ref) => {
  const { addNewCategory, inputValue, setInputValue, visibleContainer, toggleInputContainer } =
    props

  const enterKeyUp = e => e.code === 'Enter' && addNewCategory()

  return (
    <div className={visibleContainer ? 'addCategory__container visible' : 'addCategory__container'}>
      <Input
        className='addCategory__input'
        placeholder='add category'
        value={inputValue}
        onChange={setInputValue}
        onKeyUp={enterKeyUp}
        maxLength={18}
        ref={ref}
      />

      <div className='btn__container'>
        <MainBtn
          className='addCategory__add'
          type='button'
          onClick={addNewCategory}
          disabled={!inputValue}>
          add
        </MainBtn>

        <MainBtn className='addCategory__close' type='button' onClick={toggleInputContainer}>
          cancel
        </MainBtn>
      </div>
    </div>
  )
})

export default InputContainer
