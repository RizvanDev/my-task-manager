import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import DateContainer from './DateContainer/DateContainer'
import './mainContent.scss'

const MainContent = () => {
  return (
    <div className='mainContent'>
      <MainTop />
      <main className='mainContent__main'>
        <Tasks />
        <DateContainer />
      </main>
    </div>
  )
}

export default MainContent
