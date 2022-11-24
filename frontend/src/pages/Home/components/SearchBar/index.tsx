import { MagnifyingGlass, X } from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../../hooks/useDebounce'

import { SearchBarContainer } from './styles'

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '')

  const debouncedSearch = useDebounce(searchTerm, 500)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleCleanUpSearch() {
    setSearchTerm('')

    searchParams.delete('search')
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (debouncedSearch !== '') {
      searchParams.set('search', debouncedSearch)
      searchParams.set('page', '1')
      setSearchParams(searchParams)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <SearchBarContainer>
      <div>
        <MagnifyingGlass size={24} />

        <input
          name="search"
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleChange}
        />

        {searchTerm !== '' && (
          <button onClick={handleCleanUpSearch}>
            <X size={20} />
          </button>
        )}
      </div>
    </SearchBarContainer>
  )
}
