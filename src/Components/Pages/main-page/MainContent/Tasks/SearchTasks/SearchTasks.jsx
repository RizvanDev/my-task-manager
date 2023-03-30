import Input from '../../../../../../Components/UI/Input/Input'
import MainBtn from '../../../../../../Components/UI/MainBtn/MainBtn'
import useValue from '../../../../../../hooks/useValue'
import './searchTasks.scss'

const SearchTasks = ({ darkMode, searchQuery, setSearchQuery, searchOnChange, filteredTasks }) => {
  const [isTagsOpen, setIsTagsOpen] = useValue(false)

  const handleClickOpenTags = () => setIsTagsOpen(true)

  const handleClickSetAndCloseTags = task => {
    setSearchQuery(task)
    setIsTagsOpen(false)
  }

  return (
    <div className={darkMode ? 'search__container darkMode' : 'search__container'}>
      <Input
        className='search__input'
        placeholder=' Search...'
        value={searchQuery}
        onChange={searchOnChange}
        onClick={handleClickOpenTags}
      />

      {searchQuery && (
        <MainBtn className='search__clear' type='button' onClick={() => setSearchQuery('')}>
          <span>X</span>
        </MainBtn>
      )}

      {searchQuery && isTagsOpen && (
        <ul className='search__autoCompleteTags'>
          {filteredTasks.map(task => (
            <li
              key={task.time}
              className='search__autoCompleteTag'
              onClick={() => handleClickSetAndCloseTags(task.task)}>
              {task.task}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchTasks
