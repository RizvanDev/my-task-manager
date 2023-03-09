import { useContext } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import CustomTooltip from './CustomTooltip'
import './chart.scss'

const Chart = () => {
  const { darkMode } = useContext(Context)

  const data = [
    { day: 'Mon', completed: 2 },
    { day: 'Tue', completed: 7 },
    { day: 'Wed', completed: 13 },
    { day: 'Thu', completed: 4 },
    { day: 'Fri', completed: 5 },
    { day: 'Sat', completed: 15 },
    { day: 'Sun', completed: 9 },
  ]

  const chartNotify = {
    ResponsiveContainer: { width: '100%', height: 200, ariaLabel: 'Progress chart' },
    CartesianGrid: { strokeDasharray: 1, stroke: '#6669' },
    LineChart: { data: data, margin: { top: 10, right: 12 } },
    XAxis: {
      dataKey: 'day',
      tickSize: 0,
      axisLine: false,
      tickMargin: 15,
      stroke: darkMode ? '#e5e5e5' : '#283846',
    },
    YAxis: {
      width: 34,
      tickSize: 0,
      axisLine: false,
      tickMargin: 10,
      stroke: darkMode ? '#e5e5e5' : '#282846',
    },
    Tooltip: {
      content: <CustomTooltip />,
      cursor: { stroke: darkMode ? 'lightgreen' : 'green', strokeWidth: 1 },
      active: true,
    },
    Line: {
      type: 'natural',
      dataKey: 'completed',
      strokeWidth: 3,
      activeDot: {
        strokeWidth: 0,
        r: 10,
      },
      isAnimationActive: true,
      stroke: '#29A19C',
    },
  }

  if (window.matchMedia('(max-width: 1600px)').matches) {
    chartNotify.ResponsiveContainer.height = 170
    chartNotify.Line.strokeWidth = 2
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
          <Line {...chartNotify.Line} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
