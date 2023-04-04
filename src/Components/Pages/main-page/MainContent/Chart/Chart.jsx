import { useContext, useEffect } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksFromDB } from '../../../../../store/asyncActions/getTasksFromDB'
import { actions } from '../../../../../store/chartReducer'
import { Context } from '../../../../../context'
import MyTitle from '../../../../../Components/UI/MyTitle/MyTitle'
import CustomTooltip from './CustomTooltip'
import './chart.scss'

const Chart = () => {
  const dispatch = useDispatch()
  const chartData = useSelector(state => state.chartReducer)
  const { darkMode, userInfo, tabItems } = useContext(Context)

  useEffect(() => {
    dispatch(getTasksFromDB(userInfo.uid, actions.createWeeklyCompletionData))
  }, [tabItems])

  const chartNotify = {
    ResponsiveContainer: { width: '100%', height: 200, ariaLabel: 'Progress chart' },
    CartesianGrid: { strokeDasharray: 0.5, stroke: '#6669' },
    LineChart: { data: chartData, margin: { top: 10, right: 10 } },
    XAxis: {
      dataKey: 'day',
      tickSize: 0,
      tick: { fontSize: '14px' },
      axisLine: false,
      tickMargin: 12,
      stroke: darkMode ? '#e5e5e5' : '#283846',
    },
    YAxis: {
      width: 40,
      tickSize: 0,
      tick: { fontSize: '14px' },
      axisLine: false,
      tickMargin: 12,
      stroke: darkMode ? '#e5e5e5' : '#282846',
    },
    Tooltip: {
      content: <CustomTooltip />,
      cursor: { stroke: darkMode ? 'lightgreen' : 'green', strokeWidth: 1 },
      active: true,
    },
    LineActive: {
      type: 'monotone',
      dataKey: 'created',
      strokeWidth: 1,
      isAnimationActive: true,
      animationDuration: 1000,
      animationEasing: 'ease',
      stroke: ' rgba(39, 164, 213, 0.3)',
    },
    LineCompleted: {
      type: 'monotone',
      dataKey: 'completed',
      strokeWidth: 2,
      dot: { strokeWidth: 1 },
      activeDot: { strokeWidth: 0, r: 10 },
      isAnimationActive: true,
      animationDuration: 1000,
      animationEasing: 'ease',
      stroke: '#29A19C',
    },
  }

  if (window.matchMedia('(max-width: 1600px)').matches) {
    chartNotify.ResponsiveContainer.height = 170
    chartNotify.LineCompleted.strokeWidth = 2
    chartNotify.XAxis.tick.fontSize = '13px'
    chartNotify.YAxis.tick.fontSize = '13px'
  }

  if (window.matchMedia('(max-width: 1280px)').matches) {
    chartNotify.XAxis.tick.fontSize = '12px'
    chartNotify.YAxis.tick.fontSize = '12px'
  }

  if (window.matchMedia('(max-width: 1024px)').matches) {
    chartNotify.XAxis.tick.fontSize = '15px'
    chartNotify.YAxis.tick.fontSize = '15px'
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    chartNotify.XAxis.tick.fontSize = '12px'
    chartNotify.YAxis.tick.fontSize = '12px'
  }

  return (
    <div className={darkMode ? 'chart darkMode' : 'chart'}>
      <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em' margin='0 0 15px 10px'>
        Progress chart
      </MyTitle>
      <ResponsiveContainer {...chartNotify.ResponsiveContainer}>
        <LineChart {...chartNotify.LineChart}>
          <CartesianGrid {...chartNotify.CartesianGrid} />
          <XAxis {...chartNotify.XAxis} />
          <YAxis {...chartNotify.YAxis} />
          <Tooltip {...chartNotify.Tooltip} />
          <Line {...chartNotify.LineActive} />
          <Line {...chartNotify.LineCompleted} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
