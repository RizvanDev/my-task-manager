const MainBtn = props => {
  const defaultBtnStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: props.disabled && 0.5,
    cursor: props.disabled && 'not-allowed',
  }

  return (
    <button style={defaultBtnStyles} {...props}>
      {props.children}
    </button>
  )
}

export default MainBtn
