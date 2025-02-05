import React from 'react'

interface PaginationProps {
  totalCount: number
  countPerPage: number
  activePageNo: number
  setActivePageNo: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  countPerPage,
  activePageNo,
  setActivePageNo,
}) => {
  const totalPages = Math.ceil(totalCount / countPerPage)
  const range = 2 // Aktif sayfa etrafında gösterilecek sayfa sayısı

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []
    if (totalPages <= 5 + range * 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (activePageNo <= range + 2) {
        for (let i = 1; i <= range + 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (activePageNo >= totalPages - range - 1) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - range - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = activePageNo - range; i <= activePageNo + range; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination" data-datatable-pagination="true">
      <div className="pagination">
        <button
          className="btn"
          onClick={() => activePageNo > 1 && setActivePageNo(activePageNo - 1)}
          disabled={activePageNo === 1}
        >
          <i className="ki-outline ki-black-left"></i>
        </button>
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              className={`btn ${activePageNo === page ? 'active disabled' : ''}`}
              onClick={() => setActivePageNo(Number(page))}
              disabled={activePageNo === page}
            >
              {page}
            </button>
          ),
        )}
        <button
          className="btn"
          onClick={() =>
            activePageNo < totalPages && setActivePageNo(activePageNo + 1)
          }
          disabled={activePageNo === totalPages}
        >
          <i className="ki-outline ki-black-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination
