const Select = ({ ...props }) => {
  return (
    <select value={props.value} onChange={props.onChange} style={props.styles}>
      {props.options.map(item => (
        <option style={props.styles.option} key={item.title}>
          {item.title}
        </option>
      ))}
    </select>
  )
}

export default Select
