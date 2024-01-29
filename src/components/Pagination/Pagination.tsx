import React from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
   pageCount: number
   onPageChange: (selectedItem: { selected: number }) => void
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
   return (
      <ReactPaginate
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         pageCount={pageCount}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={onPageChange}
         containerClassName={'pagination'}
         activeClassName={'active'}
      />
   )
}

export default Pagination
