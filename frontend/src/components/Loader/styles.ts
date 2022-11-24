import styled from 'styled-components'

interface LoaderProps {
  showLayer: boolean
}

export const LoaderContainer = styled.div<LoaderProps>`
  position: absolute;
  inset: 0;
  background-color: ${(props) =>
    props.showLayer ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
