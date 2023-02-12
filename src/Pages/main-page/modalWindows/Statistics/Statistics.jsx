import { useContext, useEffect } from 'react'
import { Context } from '../../../../context'
import { database } from '../../../../firebase/firebaseConfig'
import useValue from '../../../../hooks/useValue'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Select from '../../../../Components/UI/Select/Select'
import StatisticsItem from './StatisticsItem'
import './statistics.scss'

const Statistics = () => {
  const [selected, , selectOnchange] = useValue('Day')
  const [statistics, setStatistics] = useValue({
    Categories: '',
    Created: '',
    Completed: '',
  })
  const { darkMode, modals, openModals, userInfo } = useContext(Context)

  const changePeriod = e => {
    selectOnchange(e)
    database.createStatistics(userInfo.uid, e.target.value, setStatistics)
  }

  useEffect(() => {
    database.createStatistics(userInfo.uid, selected, setStatistics)
  }, [modals.statisticsModal])

  const styleObj = {
    titleStyles: {
      fontWeight: '700',
      fontSize: '22px',
      lineHeight: '27px',
      letterSpacing: '0.02em',
    },
    selectStyles: {
      width: '110px',
      padding: '4px 5px',
      border: '1px solid rgba(40, 40, 70, 0.3)',
      borderRadius: '8px',
      fontWeight: '400',
      fontSize: '16px',
      cursor: 'pointer',
      option: {
        fontSize: '16px',
        color: '#666',
      },
    },
  }

  return (
    <MyModal
      darkMode={darkMode}
      opened={modals.statisticsModal}
      closeModal={() => openModals({ ...modals, statisticsModal: false })}>
      <MyTitle {...styleObj.titleStyles}>Statistics</MyTitle>

      <div className='statistics__select'>
        <span className='statistics__select-text'>Successes of the:</span>
        <Select
          styles={styleObj.selectStyles}
          options={[{ title: 'Day' }, { title: 'Month' }, { title: 'Year' }]}
          value={selected}
          onChange={changePeriod}
        />
      </div>

      <div className='statistics__container'>
        <StatisticsItem quantity={statistics.Categories} />
        <StatisticsItem itemName='Created' quantity={statistics.Created} />
        <StatisticsItem itemName='Completed' quantity={statistics.Completed} />
      </div>
    </MyModal>
  )
}

export default Statistics
