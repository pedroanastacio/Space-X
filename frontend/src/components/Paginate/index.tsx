import ReactPaginate from 'react-paginate'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { PaginateContainer } from './styles'

interface PaginateProps {
  totalPages: number
  currentPage: number
  paginate: ({ selected }: { selected: number }) => void
}

export function Paginate({ totalPages, currentPage, paginate }: PaginateProps) {
  const forcePage = totalPages > 0 ? currentPage - 1 : -1

  return (
    <PaginateContainer>
      <ReactPaginate
        onPageChange={paginate}
        pageCount={totalPages}
        forcePage={forcePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
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
