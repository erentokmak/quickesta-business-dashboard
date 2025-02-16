import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { z } from 'zod'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { useIsMobile } from '@/hooks/Responsive'
import { useToast } from '@/hooks/use-toast'
import { register } from '@/lib/api-v1/auth'

// Country codes data
const countryCodes = [
  { code: 90, label: 'Türkiye', flag: '🇹🇷', dialCode: '+90' },
  { code: 1, label: 'USA', flag: '🇺🇸', dialCode: '+1' },
  { code: 44, label: 'UK', flag: '🇬🇧', dialCode: '+44' },
  { code: 49, label: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 33, label: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 39, label: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 34, label: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 31, label: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
  { code: 46, label: 'Sweden', flag: '🇸🇪', dialCode: '+46' },
  { code: 47, label: 'Norway', flag: '🇳🇴', dialCode: '+47' },
]

// Form validation schema
const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harflerden oluşmalıdır'),
  surname: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyad sadece harflerden oluşmalıdır'),
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .min(5, 'E-posta en az 5 karakter olmalıdır')
    .max(100, 'E-posta en fazla 100 karakter olabilir'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .max(100, 'Şifre en fazla 100 karakter olabilir')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
    ),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    mobileNumber: '',
    countryCode: 90, // Default to Turkey
  })
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await register(formData)

      if (response.isSuccess) {
        toast({
          title: 'Kayıt başarılı!',
          description: 'Giriş yapabilirsiniz.',
        })

        const signInResult = await signIn('credentials', {
          redirect: false,
          username: formData.email,
          password: formData.password,
        })

        if (signInResult?.error) {
          const errorData = JSON.parse(signInResult.error)
          toast({
            variant: 'destructive',
            title: errorData.message,
            description: errorData.detail,
          })
          return
        }

        toast({
          title: 'Giriş başarılı!',
          description: 'Ana sayfaya yönlendiriliyorsunuz...',
        })

        router.push('/dashboard')
      } else {
        toast({
          variant: 'destructive',
          title: 'Kayıt başarısız',
          description: response.error || 'Bir hata oluştu.',
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Bir sorun oluştu',
        description: error.message || 'Lütfen daha sonra tekrar deneyiniz.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: any } },
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneChange = (value: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: parseInt(data.dialCode),
      mobileNumber: value, // Keep the full value including country code
    }))
  }

  const TermsDialog = () => (
    <Dialog>
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
      </DialogContent>
    </Dialog>
  )

  const PrivacyDialog = () => (
    <Dialog>
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
      </DialogContent>
    </Dialog>
  )

  // Mobile design
  if (isMobile) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn('flex flex-col gap-6')}>
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <Image
                    src="/assets/images/brand-images/quickestaiconblue.png"
                    alt="Quickesta"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="sr-only">Quickesta</span>
              </a>
              <h1 className="text-xl font-bold">
                Quickesta&apos;ya Kayıt Olun
              </h1>
              <div className="text-center text-sm">
                Zaten hesabınız var mı?{' '}
                <a
                  href="/auth/sign-in"
                  className="underline underline-offset-4"
                >
                  Giriş Yap
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Ad</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Adınız"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="surname">Soyad</Label>
                    <Input
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Soyadınız"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Telefon</Label>
                  <PhoneInput
                    country={'tr'}
                    value={formData.mobileNumber}
                    onChange={handlePhoneChange}
                    inputClass="!w-full !h-10 !text-base"
                    containerClass="!w-full"
                    buttonClass="!h-10 !border !border-input"
                    dropdownClass="!w-[300px]"
                    enableSearch
                    searchPlaceholder="Ülke Ara..."
                    searchNotFound="Ülke Bulunamadı"
                    preferredCountries={['tr', 'us', 'gb', 'de']}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false,
                    }}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                </Button>
              </div>
            </form>

            <div className="text-balance text-center text-xs text-muted-foreground">
              Devam ederek <TermsDialog /> ve <PrivacyDialog />
              &apos;nı kabul etmiş olursunuz.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop design
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Image
              src="/assets/images/brand-images/quickestaiconwhite.png"
              alt="Quickesta"
              width={32}
              height={32}
            />
          </div>
          Quickesta
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hesap Oluşturun</CardTitle>
            <CardDescription>
              Bilgilerinizi girerek hemen başlayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Ad</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Adınız"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="surname">Soyad</Label>
                      <Input
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder="Soyadınız"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Telefon</Label>
                    <PhoneInput
                      country={'tr'}
                      value={formData.mobileNumber}
                      onChange={handlePhoneChange}
                      inputClass="!w-full !h-10 !text-base"
                      containerClass="!w-full"
                      buttonClass="!h-10 !border !border-input"
                      dropdownClass="!w-[300px]"
                      enableSearch
                      searchPlaceholder="Ülke Ara..."
                      searchNotFound="Ülke Bulunamadı"
                      preferredCountries={['tr', 'us', 'gb', 'de']}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: false,
                      }}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Zaten hesabınız var mı?{' '}
                  <a
                    href="/auth/sign-in"
                    className="underline underline-offset-4"
                  >
                    Giriş Yap
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground">
          Devam ederek <TermsDialog /> ve <PrivacyDialog />
          &apos;nı kabul etmiş olursunuz.
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
