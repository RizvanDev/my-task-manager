import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import DateContainer from './DateContainer/DateContainer'
import Chart from './Chart/Chart'
import './mainContent.scss'

const MainContent = () => {
  return (
    <div className='mainContent'>
      <MainTop />
      <main className='mainContent__main'>
        <Tasks />
        <div className='mainContent__others'>
          <DateContainer />
          <Chart />
        </div>
      </main>
    </div>
  )
}

export default MainContent
