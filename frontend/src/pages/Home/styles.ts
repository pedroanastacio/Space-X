import styled from 'styled-components'

export const HomeContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.5rem;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    color: ${(props) => props.theme.white};
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    font-size: 2.2rem;
    text-align: center;

    img {
      width: 100%;
      max-width: 70px;
      height: auto;
    }
  }

  @media only screen and (max-width: 450px) {
    padding: 3rem 1rem;
  }
`

export const Stats = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 1rem;

  margin-top: 3rem;

  > div {
    background: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      color: ${(props) => props.theme['orange-500']};
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  @media only screen and (max-width: 900px) {
    column-gap: 1rem;
  }

  @media only screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`

export const LaunchesRecords = styled.section`
  margin-top: 4rem;

  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
  }
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
