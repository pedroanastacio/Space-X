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
    font-weight: 600;
    text-align: center;

    img {
      width: 100%;
      max-width: 70px;
      height: auto;
    }
  }
`

export const Stats = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;

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
`

export const LaunchesRecords = styled.section`
  margin-top: 4rem;

  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
  }
`

export const LaunchesTable = styled.main`
  background: ${(props) => props.theme['gray-700']};
  border-radius: 8px;

  table {
    margin-top: 2rem;
    width: 100%;

    border-collapse: separate;
    border-spacing: 0;
    padding: 0.5rem 0rem;

    th {
      padding: 1rem 1rem 1.5rem 1rem;
      font-weight: 400;
      color: ${(props) => props.theme['orange-500']};
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
  }

  img {
    width: 100%;
    max-width: 30px;
    height: auto;
  }
`
