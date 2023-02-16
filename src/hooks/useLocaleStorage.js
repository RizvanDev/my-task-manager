import useValue from './useValue'

const useLocaleStorage = (key, initialValue) => {
  const getValue = () => {
    const storage = localStorage.getItem(key)

    return storage ? JSON.parse(storage) : initialValue
  }

  const [value, setValue] = useValue(getValue)

  localStorage.setItem(key, JSON.stringify(value))

  return [value, setValue]
}

export default useLocaleStorage
