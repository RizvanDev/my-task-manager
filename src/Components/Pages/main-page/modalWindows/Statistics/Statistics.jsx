import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksFromDB } from '../../../../../store/asyncActions/getTasksFromDB'
import { statisticsActions } from '../../../../../store/reducers/statisticsReducer'
import { Context } from '../../../../../context'
import useValue from '../../../../../hooks/useValue'
import MyModal from '../../../../../Components/UI/MyModal/MyModal'
import MyTitle from '../../../../../Components/UI/MyTitle/MyTitle'
import Select from '../../../../../Components/UI/Select/Select'
import StatisticsItem from './StatisticsItem'
import './statistics.scss'

const Statistics = () => {
  const dispatch = useDispatch()
  const statistics = useSelector(state => state.statisticsReducer)
  const { darkMode, modals, openModals, userInfo, tabItems } = useContext(Context)
  const [selected, , selectOnchange] = useValue('Day')

  const selectPeriod = selected => {
    return {
      Day: () => dispatch(statisticsActions.createDayStatistics(tabItems)),
      Month: () => dispatch(getTasksFromDB(userInfo.uid, statisticsActions.createMonthStatistics)),
      Year: () => dispatch(getTasksFromDB(userInfo.uid, statisticsActions.createYearStatistics)),
    }[selected]()
  }

  const changePeriod = e => {
    selectOnchange(e)
    selectPeriod(e.target.value)
  }

  useEffect(() => {
    selectPeriod(selected)
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
        <StatisticsItem quantity={statistics.categories} />
        <StatisticsItem itemName='Created' quantity={statistics.createdTasks} />
        <StatisticsItem itemName='Completed' quantity={statistics.completedTasks} />
      </div>
    </MyModal>
  )
}

export default Statistics
