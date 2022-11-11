import { useState } from 'react'

const useValue = initialValue => {
  const [value, setValue] = useState(initialValue)

  const onChange = e => setValue(e.target.value)

  return [value, setValue, onChange]
}

export default useValue
