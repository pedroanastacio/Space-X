import ReactPaginate from 'react-paginate'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { PaginateContainer } from './styles'

interface PaginateProps {
  params: {
    currentPage: number
    totalDocs: number
    docsPerPage: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }

  paginate: ({ selected }: { selected: number }) => void
}

export function Paginate({ params, paginate }: PaginateProps) {
  return (
    <PaginateContainer>
      <ReactPaginate
        onPageChange={paginate}
        pageCount={params.totalPages ?? 0}
        pageRangeDisplayed={1}
        previousLabel={<CaretLeft size={16} weight="bold" />}
        nextLabel={<CaretRight size={16} weight="bold" />}
        containerClassName={'pagination'}
        pageLinkClassName={'page-number'}
        previousLinkClassName={'page-number'}
        nextLinkClassName={'page-number'}
        activeLinkClassName={'active'}
        breakClassName={'break-ellipsis'}
        disabledLinkClassName={'disabled-link'}
      />
    </PaginateContainer>
  )
}
