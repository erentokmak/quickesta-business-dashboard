import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { Button } from '@/ui/button'

export function TermsAndPrivacy() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const TermsDialog = () => (
    <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
      <DialogTrigger className="underline underline-offset-4 hover:text-primary">
        Kullanım Koşulları
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Kullanım Koşulları</DialogTitle>
          <DialogDescription>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pr-4 text-sm text-muted-foreground">
          <h3 className="text-base font-semibold text-foreground">1. Giriş</h3>
          <p>
            Quickesta platformunu (&quot;Platform&quot;) kullanarak, bu Kullanım
            Koşullarını (&quot;Koşullar&quot;) kabul etmiş olursunuz. Quickesta,
            bireysel kullanıcılardan küçük ve büyük çaplı işletmelere kadar
            geniş bir kullanıcı yelpazesine hizmet veren, gelişmiş bir
            sosyalleştirilmiş ticaret platformudur.
          </p>

          <h3 className="text-base font-semibold text-foreground">
            2. Platform Özellikleri
          </h3>
          <p>Quickesta aşağıdaki temel özellikleri sunar:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Yapay Zeka Destekli Araçlar: - Site ve ürün optimizasyonu -
              Pazarlama stratejileri - A/B testleri - Kişiselleştirme sistemleri
              - Otomatik içerik üretimi
            </li>
            <li>
              Çoklu Kanal Yönetimi: - SMS entegrasyonu - Instagram entegrasyonu
              - WhatsApp Business API - Telegram bot entegrasyonu - E-posta
              pazarlama
            </li>
            <li>
              Network ve İş Birlikleri: - Tedarikçi ağı - Influencer pazaryeri -
              B2B iş birlikleri - Affiliate sistemleri - Referans programları
            </li>
            <li>
              Satış ve Pazarlama: - Çoklu mağaza yönetimi - Döviz bazlı satış -
              Video içi satış - Canlı yayın satışı - QR ve link ile hızlı satış
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            3. Hizmet Modelleri
          </h3>
          <p>Platform aşağıdaki hizmet modellerini sunar:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              E-ticaret Çözümleri: - B2C ve B2B satış altyapısı -
              Özelleştirilebilir mağaza tasarımları - Stok ve envanter yönetimi
              - Entegre POS sistemleri - Çoklu ödeme seçenekleri
            </li>
            <li>
              Pazarlama Araçları: - Sosyal medya yönetimi - İçerik pazarlama
              araçları - SEO optimizasyon - Reklam yönetimi - Analitik raporlama
            </li>
            <li>
              İş Geliştirme Hizmetleri: - Pazar analizi - Rakip analizi - Büyüme
              stratejileri - Performans izleme - Danışmanlık hizmetleri
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            4. Kullanıcı Yükümlülükleri
          </h3>
          <p>Platform kullanıcıları aşağıdaki yükümlülükleri kabul eder:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Hesap Güvenliği: - Güçlü şifre kullanımı - İki faktörlü doğrulama
              - Hesap bilgilerinin korunması - Yetkisiz erişimin önlenmesi
            </li>
            <li>
              İçerik Politikası: - Doğru ve güncel bilgi paylaşımı - Telif
              haklarına saygı - Yasalara uygun içerik - Etik ticaret kurallarına
              uyum
            </li>
            <li>
              Platform Kuralları: - Adil rekabet ilkeleri - Spam ve kötüye
              kullanım yasağı - Müşteri haklarına saygı - Veri gizliliğine uyum
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            5. Fikri Mülkiyet
          </h3>
          <p>
            Platform üzerindeki tüm içerik, yazılım, tasarım ve diğer
            materyaller Quickesta&apos;nın fikri mülkiyetidir. Kullanıcılar, bu
            içerikleri izinsiz kullanamaz, kopyalayamaz veya dağıtamaz.
          </p>

          <h3 className="text-base font-semibold text-foreground">
            6. Veri Kullanımı ve Analitik
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Veri Toplama: - Kullanıcı davranışları - Satış istatistikleri -
              Platform etkileşimleri - Performans metrikleri
            </li>
            <li>
              Veri İşleme: - Pazarlama optimizasyonu - Ürün önerileri -
              Fiyatlandırma stratejileri - Trend analizi
            </li>
            <li>
              Yapay Zeka Kullanımı: - Otomatik içerik üretimi - Müşteri
              segmentasyonu - Satış tahminleri - Risk analizi
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            7. Ödeme ve Komisyonlar
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Ödeme Modelleri: - Aylık abonelik - Komisyon bazlı - Hibrit model
              - Özel paketler
            </li>
            <li>
              Komisyon Oranları: - Standart satış komisyonu - Affiliate
              komisyonları - Referans programı ödemeleri - Özel kampanya
              komisyonları
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            8. Sorumluluk Sınırları
          </h3>
          <p>Quickesta aşağıdaki durumlardan sorumlu tutulamaz:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Teknik Sorunlar: - Platform kesintileri - Bağlantı sorunları -
              Veri kayıpları - Sistem güncellemeleri
            </li>
            <li>
              Üçüncü Taraf Hizmetler: - Ödeme işlemcileri - Kargo firmaları -
              Entegrasyon sağlayıcıları - API servisleri
            </li>
            <li>
              Kullanıcı Kaynaklı Sorunlar: - Yanlış veri girişi - Hesap
              güvenliği ihlalleri - İçerik hataları - İşlem hataları
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            9. Değişiklikler ve Güncellemeler
          </h3>
          <p>
            Quickesta, platform özelliklerini ve kullanım koşullarını önceden
            haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler
            yayınlandığı anda yürürlüğe girer.
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setTermsOpen(false)}
          >
            Okudum
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const PrivacyDialog = () => (
    <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
      <DialogTrigger className="underline underline-offset-4 hover:text-primary">
        Gizlilik Politikası
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gizlilik Politikası</DialogTitle>
          <DialogDescription>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pr-4 text-sm text-muted-foreground">
          <h3 className="text-base font-semibold text-foreground">
            1. Veri Toplama ve Kullanım
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Kullanıcı Verileri: - Hesap bilgileri - İletişim bilgileri - Ödeme
              bilgileri - Profil bilgileri
            </li>
            <li>
              İşlem Verileri: - Sipariş geçmişi - Ödeme kayıtları - Satış
              istatistikleri - Stok hareketleri
            </li>
            <li>
              Analitik Veriler: - Platform kullanım verileri - Performans
              metrikleri - Etkileşim kayıtları - Davranış analizleri
            </li>
            <li>
              Teknik Veriler: - IP adresleri - Cihaz bilgileri - Tarayıcı
              bilgileri - Konum verileri
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            2. Veri İşleme Amaçları
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Platform İyileştirmeleri: - Kullanıcı deneyimi optimizasyonu -
              Performans iyileştirmeleri - Hata tespiti ve düzeltme - Yeni
              özellik geliştirme
            </li>
            <li>
              Pazarlama ve Analiz: - Hedefli reklamcılık - Pazar araştırması -
              Trend analizi - Kullanıcı segmentasyonu
            </li>
            <li>
              Güvenlik ve Doğrulama: - Kimlik doğrulama - Dolandırıcılık önleme
              - Risk değerlendirmesi - Güvenlik denetimleri
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            3. Veri Paylaşımı
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              İş Ortakları: - Ödeme işlemcileri - Lojistik sağlayıcılar -
              Pazarlama ajansları - Analitik servisleri
            </li>
            <li>
              Yasal Gereklilikler: - Resmi kurumlar - Yasal talepler -
              Düzenleyici otoriteler - Mahkeme kararları
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            4. Veri Güvenliği
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Güvenlik Önlemleri: - SSL/TLS şifreleme - Güvenlik duvarları -
              Veri şifreleme - Erişim kontrolü
            </li>
            <li>
              Veri Koruma: - Yedekleme sistemleri - Felaket kurtarma - Güvenlik
              denetimleri - İzleme sistemleri
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            5. Kullanıcı Hakları
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Veri Yönetimi: - Veri erişimi - Veri düzeltme - Veri silme - Veri
              taşıma
            </li>
            <li>
              Tercih Yönetimi: - Bildirim ayarları - Pazarlama tercihleri -
              Gizlilik ayarları - Hesap yönetimi
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            6. Çerezler ve İzleme
          </h3>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              Çerez Türleri: - Zorunlu çerezler - İşlevsel çerezler - Analitik
              çerezler - Pazarlama çerezleri
            </li>
            <li>
              İzleme Teknolojileri: - Web işaretçileri - Piksel etiketleri -
              Oturum kayıtları - Analitik araçları
            </li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">
            7. İletişim
          </h3>
          <p>
            Gizlilik politikamız hakkında sorularınız için support@quickesta.com
            adresinden bize ulaşabilirsiniz.
          </p>

          <h3 className="text-base font-semibold text-foreground">
            8. Güncellemeler
          </h3>
          <p>
            Bu politika periyodik olarak güncellenebilir. Önemli değişiklikler
            hakkında kullanıcılar bilgilendirilir.
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setPrivacyOpen(false)}
          >
            Okudum
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="text-center text-xs text-muted-foreground">
      Devam ederek <TermsDialog /> ve <PrivacyDialog />
      &apos;nı kabul etmiş olursunuz.
    </div>
  )
}
