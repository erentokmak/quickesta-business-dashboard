import React from 'react'
import formatPhoneNumber from '@/utils/helpers/regex'
import moment from 'moment'

const ExpandedOrderRow = ({ assignedDealer, dealerNotes }) => {
  return (
    <tr>
      <td colSpan={10}>
        <div className="p-4 bg-light rounded shadow-sm">
          <h4 className="mb-4">Teslimatı Yapacak Bayi Bilgileri</h4>
          {assignedDealer ? (
            <table className="table table-borderless mb-0">
              <tbody>
                <tr>
                  <th scope="row" className="text-muted">
                    Bayi
                  </th>
                  <td>{assignedDealer.Title}</td>
                </tr>
                <tr>
                  <th scope="row" className="text-muted">
                    Not
                  </th>
                  <td>
                    {dealerNotes.map((note, index) => (
                      <div
                        key={index}
                        className="flex flex-col bg-gray-50 p-2 rounded w-full"
                      >
                        <div className="flex flex-row justify-between">
                          <div className="text-xs text-gray-400">
                            {moment(note.NoteDate.toDate()).format(
                              'DD.MM.YYYY HH:mm',
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {note.Note}
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-muted">
                    Adres
                  </th>
                  <td>{assignedDealer.FullAddress}</td>
                </tr>
                <tr>
                  <th scope="row" className="text-muted">
                    Telefon
                  </th>
                  <td>
                    <a href={`tel:${assignedDealer.PhoneNumber}`}>
                      {formatPhoneNumber(assignedDealer.PhoneNumber)}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-danger">Henüz bayi atanmamış.</p>
          )}
        </div>
      </td>
    </tr>
  )
}

export default ExpandedOrderRow
