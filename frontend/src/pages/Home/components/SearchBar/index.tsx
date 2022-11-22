import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'

import { SearchBarContainer } from './styles'

export function SearchBar() {
  const [search, setSearch] = useState('')

  function handleSubmit() {}

  return (
    <SearchBarContainer onSubmit={handleSubmit}>
      <div>
        <MagnifyingGlass size={24} />
        <input
          name="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <button type="submit">Buscar</button>
    </SearchBarContainer>
  )
}
