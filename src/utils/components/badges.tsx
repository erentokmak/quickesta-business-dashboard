import { OrderStatus } from '@/types'
import React from 'react'

export const renderBadge = (
  value: string | number,
  type: 'status' | 'platform',
) => {
  const badgeMap = {
    status: {
      [OrderStatus.Yeni]: { text: 'Yeni', class: 'badge-primary' },
      [OrderStatus.TeslimEdildi]: {
        text: 'Teslim Edildi',
        class: 'badge-success',
      },
      [OrderStatus.Yolda]: { text: 'Yolda', class: 'badge-warning' },
      [OrderStatus.TeslimEdilemedi]: {
        text: 'Teslim Edilemedi',
        class: 'badge-danger',
      },
    },
    platform: {
      1: { text: 'Kapıda Ödeme', class: 'badge-light' },
      2: { text: 'Kredi Kartı', class: 'badge-light' },
      3: { text: 'Masterpass', class: 'badge-light' },
      4: { text: 'HepsiBurada', class: 'badge-warning' },
      5: { text: 'Getir', class: 'badge-info' },
      6: { text: 'Trendyol', class: 'badge-warning' },
    },
  }
  const badge = badgeMap[type][value]
  return badge ? (
    <span className={`badge ${badge.class} badge-xs`}>{badge.text}</span>
  ) : null
}
