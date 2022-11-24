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
    padding: 0.5rem 0rem 0rem 0rem;

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
