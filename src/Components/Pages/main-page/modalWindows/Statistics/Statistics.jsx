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
import cl from './statistics.module.scss'

const Statistics = () => {
  const dispatch = useDispatch()
  const statistics = useSelector(state => state.statisticsReducer)
  const { darkMode, modals, openModals, userInfo, tabItems } = useContext(Context)
  const [selected, , selectOnchange] = useValue('Day')

  const periodFunctions = {
    Day: () => dispatch(statisticsActions.createDayStatistics(tabItems)),
    Month: () => dispatch(getTasksFromDB(userInfo.uid, statisticsActions.createMonthStatistics)),
    Year: () => dispatch(getTasksFromDB(userInfo.uid, statisticsActions.createYearStatistics)),
  }

  const selectPeriod = e => {
    selectOnchange(e)
    periodFunctions[e.target.value]()
  }

  useEffect(() => {
    periodFunctions[selected]()
  }, [modals.statisticsModal])

  return (
    <MyModal
      darkMode={darkMode}
      opened={modals.statisticsModal}
      closeModal={() => openModals({ ...modals, statisticsModal: false })}>
      <MyTitle fontWeight='700' fontSize='22px' lineHeight='27px' letterSpacing='0.02em'>
        Statistics
      </MyTitle>

      <div className={cl.selectContainer}>
        <span className={cl.selectText}>Successes of the:</span>
        <Select
          className={cl.select}
          options={[{ title: 'Day' }, { title: 'Month' }, { title: 'Year' }]}
          value={selected}
          onChange={selectPeriod}
        />
      </div>

      <div className={cl.statisticsContainer}>
        <StatisticsItem quantity={statistics.categories} />
        <StatisticsItem itemName='Created' quantity={statistics.createdTasks} />
        <StatisticsItem itemName='Completed' quantity={statistics.completedTasks} />
      </div>
    </MyModal>
  )
}

export default Statistics
