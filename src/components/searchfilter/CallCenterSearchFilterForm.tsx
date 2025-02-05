import React from 'react'
import Form from 'react-bootstrap/Form'
import { OrderStatus } from '@/types'
import { useScreenSize } from '@/hooks/Responsive'

const ORDER_STATUS_LIST = Object.values(OrderStatus).map((status, index) => ({
  ID: index + 1,
  Name: status,
}))

interface CallCenterSearchFilterFormProps {
  searchParams: any
  setSearchParams: any
  searchOrder: () => void
}

const CallCenterSearchFilterForm: React.FC<CallCenterSearchFilterFormProps> = ({
  searchParams,
  setSearchParams,
  searchOrder,
}) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize()

  return (
    <>
      <div className="flex">
        <div className={`input-group ${!isDesktop ? 'w-full' : ''}`}>
          <input
            type="text"
            className="input input-sm"
            placeholder="Sipariş no ile ara..."
            value={searchParams.term}
            onChange={(e) =>
              setSearchParams({ ...searchParams, term: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                searchOrder()
              }
            }}
          />
          <button
            className="btn btn-icon btn-sm btn-light"
            onClick={() => searchOrder()}
          >
            <i className="ki-duotone ki-magnifier fs-5"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:gap-5">
        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex gap-2">
            <label className="input input-sm">
              <Form.Control
                type="date"
                value={searchParams.startDate}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    startDate: e.target.value,
                  })
                }
              />
            </label>
            <label className="input input-sm">
              <Form.Control
                type="date"
                value={searchParams.endDate}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    endDate: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <select
            className="select select-sm w-40"
            value={searchParams.status}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                status: parseInt(e.target.value),
              })
            }
          >
            {ORDER_STATUS_LIST.map((status) => (
              <option key={status.ID} value={status.ID}>
                {status.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default CallCenterSearchFilterForm
