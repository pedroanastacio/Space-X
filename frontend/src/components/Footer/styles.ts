import styled from 'styled-components'

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;

  span {
    color: ${(props) => props.theme['gray-500']};
    font-size: 0.8rem;
    text-align: center;
  }
`
