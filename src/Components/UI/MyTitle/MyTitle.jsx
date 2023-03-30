import './myTitle.scss'

const MyTitle = ({ children, ...styles }) => {
  return (
    <div className='myTitle' style={styles}>
      {children}
    </div>
  )
}

export default MyTitle
