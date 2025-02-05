import React from 'react'

interface ShowingProps {
  perPage: number
  setCountPerPage: (perPage: number) => void
  values: any
}

const Showing: React.FC<ShowingProps> = ({
  perPage,
  setCountPerPage,
  values,
}) => {
  return (
    <div className="flex items-center gap-2">
      Bir sayfada
      <select
        className="select select-sm w-16"
        data-datatable-size="true"
        name="perpage"
        onChange={(e) => {
          setCountPerPage(parseInt(e.target.value))
        }}
      >
        {values.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      adet kayıt göster.
    </div>
  )
}

export default Showing
