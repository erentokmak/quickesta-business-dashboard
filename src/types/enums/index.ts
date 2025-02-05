export enum ReferenceSourceID {
  BAYİ = 2,
  MÜŞTERİ = 1,
}

export enum PaymentTypeID {
  CASH_ON_DELIVERY = 1,
  CREDIT_CARD = 2,
  MASTERPASS = 3,
  HEPSIBURADA = 4,
  GETIR = 5,
  TRENDYOL = 6,
}

export enum OrderStatusID {
  Yeni = 1,
  Yolda = 2,
  TeslimEdildi = 3,
  Iptal = 4,
  OdemeBasarisiz = 5,
  TeslimEdilemedi = 6,
}

export enum OrderStatus {
  Yeni = 'Yeni',
  Yolda = 'Yolda',
  TeslimEdildi = 'Teslim Edildi',
  Iptal = 'İptal',
  OdemeBasarisiz = 'Ödeme Başarısız',
  TeslimEdilemedi = 'Teslim Edilemedi',
}
