const Select = props => {
  const { options, value, onChange, className } = props

  return (
    <select className={className} value={value} onChange={onChange}>
      {options.map(item => (
        <option key={item.title}>{item.title}</option>
      ))}
    </select>
  )
}

export default Select
