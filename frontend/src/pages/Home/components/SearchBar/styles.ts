import styled from 'styled-components'

export const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-top: 2rem;

  div {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;

    border-radius: 8px;
    padding: 0 1rem;
    background: ${(props) => props.theme['gray-900']};

    svg {
      color: ${(props) => props.theme['orange-500']};
    }

    input {
      width: 100%;
      height: 45px;
      background: transparent;
      border: none;
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-100']};
    }
  }

  button {
    border-radius: 8px;
    border: none;
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme['orange-500']};
    color: ${(props) => props.theme['gray-900']};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`
