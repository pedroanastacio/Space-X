import styled from 'styled-components'

export const PaginateContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 1rem;

  & .pagination {
    display: flex;
    gap: 0.5rem;

    list-style-type: none;
  }

  & .page-number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 25px;
    height: 25px;
    border-radius: 4px;
    font-size: 0.8rem;
    background-color: ${(props) => props.theme['gray-600']};
    color: ${(props) => props.theme['gray-400']};

    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme['gray-300']};
    }
  }

  & .active {
    background-color: ${(props) => props.theme['orange-500']};
    color: ${(props) => props.theme['gray-900']};
  }

  & .break-ellipsis {
    color: ${(props) => props.theme['gray-500']};
  }

  & .page-number.disabled-link {
    opacity: 0.3;

    &:hover {
      color: ${(props) => props.theme['gray-400']};
    }
  }
`

interface PageIndicatorProps {
  current: boolean
}

export const PageIndicator = styled.li<PageIndicatorProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.current ? props.theme['orange-500'] : props.theme['gray-600']};
  color: ${(props) =>
    props.current ? props.theme['gray-900'] : props.theme['gray-400']};

  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme['gray-300']};
  }
`

interface PageChangeProps {
  active: boolean
}

export const PageChanger = styled.li<PageChangeProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;
  border-radius: 4px;
  background-color: ${(props) => props.theme['gray-600']};
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  cursor: pointer;

  svg {
    color: ${(props) => props.theme['gray-500']};
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme['gray-300']};
    }
  }
`
