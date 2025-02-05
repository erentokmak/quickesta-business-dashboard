/**
 * Call Center Not Tarihçesi Modal Bileşeni
 * - Sipariş için kaydedilmiş notları görüntüler
 * - Yeni not ekleme imkanı sağlar
 * - Notları tarih sırasına göre listeler
 * - Her not için agent bilgisi ve tarih gösterir
 */
import React from 'react'
import { Modal } from '@/ui'
import formatPhoneNumber from '@/utils/helpers/regex'
import styled from 'styled-components'
import { Order } from '@/types'
import { DocumentData } from '@firebase/firestore'
import moment from 'moment'

// Timeline stil tanımı
const NoteTimeline = styled.div`
  position: relative;
  padding-left: 20px;
  border-left: 2px solid #ddd;
`

// Props interface tanımı
interface NoteHistoryModalProps {
  /** Sipariş için kaydedilmiş notlar listesi */
  callCenterNotes?: DocumentData[] | undefined
  /** İlgili sipariş bilgisi */
  order?: Order
  /** Not kaydetme fonksiyonu */
  saveCallCenterNote: (orderId: number) => void
  /** Not state'ini güncelleyen fonksiyon */
  setCallCenterNote: (note?: string) => void
}

/**
 * Call Center notlarını gösteren ve yeni not eklemeye imkan veren modal bileşeni
 */
const NoteHistoryModal: React.FC<NoteHistoryModalProps> = ({
  callCenterNotes,
  order,
  saveCallCenterNote,
  setCallCenterNote,
}) => {
  // Sipariş detay bilgileri
  const orderDetails = [
    { label: 'Sipariş No:', value: order?.OrderID },
    { label: 'Müşteri:', value: order?.Customer?.Title },
    {
      label: 'Telefon:',
      value: formatPhoneNumber(order?.Customer?.PhoneNumber),
    },
  ]

  // Not ekleme formunu temizle
  const handleClearNote = () => setCallCenterNote('')

  return (
    <Modal
      modalId={`call_center_chat_history_${order?.OrderID}`}
      modalTitle={`Call Center Not Tarihçesi - ${order?.OrderID}`}
      setActivePageNo={() => console.log('')}
    >
      <div className="min-w-full p-4 bg-white rounded-lg shadow-sm">
        {/* Sipariş Detay Bilgileri */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm font-medium text-gray-700 space-y-2">
            {orderDetails.map(({ label, value }) => (
              <span key={label} className="block">
                <span className="text-gray-500">{label}</span> {value}
              </span>
            ))}
          </p>
        </div>

        {/* Notlar Timeline */}
        <NoteTimeline className="m-3 min-w-full">
          {callCenterNotes?.map(({ AgentEmail, NoteDate, AgentNote }) => (
            <div
              className="flex gap-4 scrollable"
              key={`${AgentEmail}${NoteDate}`}
            >
              <div className="border border-gray-100 bg-white min-w-full mb-3 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-sm text-gray-500 mb-2">
                  {moment(NoteDate?.toDate()).format('DD.MM.YYYY HH:mm')}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600">
                    {AgentEmail}
                  </p>
                  <p className="text-base text-gray-700">{AgentNote}</p>
                </div>
              </div>
            </div>
          ))}
        </NoteTimeline>

        {/* Not Ekleme Formu */}
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-gray-700 placeholder-gray-400 transition duration-200 mb-4"
          name="message"
          placeholder="Not ekle..."
          onChange={(e) => setCallCenterNote(e.target.value)}
          rows={3}
          autoComplete="off"
          onBlur={(e) => {
            e.target.value = ''
          }}
        />

        {/* Aksiyon Butonları */}
        <div className="flex flex-row justify-end space-x-3">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
            data-modal-dismiss="true"
            onClick={handleClearNote}
          >
            Vazgeç
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
            onClick={() => saveCallCenterNote(order?.OrderID ?? 0)}
          >
            Ekle
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NoteHistoryModal
