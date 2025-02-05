import React from 'react'
import { Customer } from '@/types'
import Link from 'next/link'

interface DealersTableProps {
  dealers: Customer[]
}

export const DealersTable: React.FC<DealersTableProps> = ({ dealers }) => {
  return (
    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
      <thead>
        <tr className="fw-bold fs-6 text-gray-800">
          <th>Seç</th>
          <th>Bayi No</th>
          <th>Görünen Ad / Telefon</th>
          <th>Ünvan</th>
          <th>Aktif</th>
          <th>Açıklama</th>
        </tr>
      </thead>
      <tbody>
        {dealers &&
          dealers.map((dealer) => (
            <tr key={dealer.CustomerID}>
              <th>
                <input type="checkbox" />
              </th>
              <td>
                <Link href={`/dashboard/dealers/${dealer.CustomerID}`}>
                  {dealer.CustomerID}
                </Link>
              </td>
              <td>
                <span>{dealer.Nickname}</span>
                <br />
                <a href={`tel:${dealer.PhoneNumber}`}>{dealer.PhoneNumber}</a>
              </td>
              <td>{dealer.Title}</td>
              <td>
                {dealer.IsPassive ? (
                  <span className="badge badge-outline badge-warning">
                    Aktif Değil
                  </span>
                ) : (
                  <span className="badge badge-outline badge-success">
                    Aktif
                  </span>
                )}
              </td>
              <td>{dealer.Description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
