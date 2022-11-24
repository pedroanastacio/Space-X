/* eslint-disable no-unused-vars */
import styled from 'styled-components'

export const LaunchesTableContainer = styled.main`
  background: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;

  table {
    width: 100%;

    border-collapse: separate;
    border-spacing: 0;
    padding: 0.5rem 0rem;

    th {
      padding: 1rem 1rem 1.5rem 1rem;
      font-weight: 400;
      color: ${(props) => props.theme['orange-500']};
      font-size: 0.875rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem 1.5rem 1rem;
  }
`

interface LaunchesTableRowProps {
  index: number
}

export const LaunchesTableRow = styled.tr<LaunchesTableRowProps>`
  background: ${(props) =>
    props.index % 2 === 0 ? props.theme['gray-600'] : props.theme['gray-700']};

  td {
    padding: 1rem;
    color: ${(props) => props.theme['gray-100']};
    text-align: center;
    font-size: 0.875rem;

    * {
      vertical-align: middle;
    }

    a {
      svg {
        color: #ff0000;
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  img {
    width: 100%;
    max-width: 30px;
    height: auto;
  }
`

export const LaunchesList = styled.ul`
  width: 100%;
  list-style-type: none;
`

interface LaunchesListItemProps {
  index: number
}

export const LaunchListItem = styled.li<LaunchesListItemProps>`
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

enum BadgeColor {
  SUCESSO = 'green-500',
  FALHA = 'red-500',
  INDETERMINADO = 'gray-800',
}

interface BadgeProps {
  type: 'SUCESSO' | 'FALHA' | 'INDETERMINADO'
}

export const Badge = styled.span<BadgeProps>`
  background: ${(props) => props.theme[BadgeColor[props.type]]};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: ${(props) => props.theme.white};
  font-size: 0.8rem;
  font-weight: 600;
`

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin-top: 4rem;

  svg {
    color: ${(props) => props.theme['gray-500']};
  }

  span {
    text-align: center;
    color: ${(props) => props.theme['gray-500']};
    font-size: 0.875rem;
  }
`
