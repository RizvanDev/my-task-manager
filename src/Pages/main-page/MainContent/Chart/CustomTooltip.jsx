const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='chart__custom-tooltip'>
        <p className='label'>{payload[0].payload.day}</p>
        <p className='label'>
          {payload[0].dataKey} : {payload[0].value}
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
