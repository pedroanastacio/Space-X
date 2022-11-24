import styled from 'styled-components'

export const LaunchesListContainer = styled.ul`
  width: 100%;
  list-style-type: none;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
`

interface LaunchesListItemProps {
  index: number
}

export const LaunchesListItem = styled.li<LaunchesListItemProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  background: ${(props) =>
    props.index % 2 === 0 ? props.theme['gray-600'] : props.theme['gray-700']};
  padding: 1.5rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    span {
      text-align: center;
    }

    img {
      width: 100%;
      max-width: 35px;
      height: auto;
    }

    a {
      svg {
        color: #ff0000;
      }
    }
  }
`
