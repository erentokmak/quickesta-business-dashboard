import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
import { extractCountryCode, formatPhoneNumber } from '@/utils/formatters/phone'
import { ISignUpFormData, ISignUpFormErrors } from '@/types/auth'

export default function SignUp() {
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    mobileNumber: '',
    countryCode: 90,
  })
  const [errors, setErrors] = useState<ISignUpFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = (data: ISignUpFormData): ISignUpFormErrors => {
    const errors: ISignUpFormErrors = {}

    if (!data.name || data.name.length < 2) {
      errors.name = 'Ad en az 2 karakter olmalıdır'
    }
    if (!data.surname || data.surname.length < 2) {
      errors.surname = 'Soyad en az 2 karakter olmalıdır'
    }
    if (!data.email || !data.email.includes('@')) {
      errors.email = 'Geçerli bir e-posta adresi giriniz'
    }
    if (!data.password || data.password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalıdır'
    }
    if (!data.mobileNumber || data.mobileNumber.length < 10) {
      errors.phone = 'Geçerli bir telefon numarası giriniz'
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      toast({
        variant: 'destructive',
        title: 'Form hatası',
        description: 'Lütfen tüm alanları doğru şekilde doldurunuz.',
      })
      return
    }

    setIsLoading(true)

    try {
      const registerData = {
        ...formData,
        mobileNumber: formatPhoneNumber(
          formData.mobileNumber,
          formData.countryCode,
        ),
        confirmPassword: formData.password,
      }

      const response = await register(registerData)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneChange = (value: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: extractCountryCode(data.dialCode),
      mobileNumber: value,
    }))
  }

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            className={cn(errors.name && 'border-red-500')}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
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
            className={cn(errors.surname && 'border-red-500')}
          />
          {errors.surname && (
            <span className="text-xs text-red-500">{errors.surname}</span>
          )}
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
          className={cn(errors.email && 'border-red-500')}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}
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
          className={cn(errors.password && 'border-red-500')}
        />
        {errors.password && (
          <span className="text-xs text-red-500">{errors.password}</span>
        )}
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
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone}</span>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
      </Button>

      <div className="text-center text-sm">
        Zaten hesabınız var mı?{' '}
        <a href="/auth/sign-in" className="underline underline-offset-4">
          Giriş Yap
        </a>
      </div>
    </form>
  )

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

  if (isMobile) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/assets/images/brand-images/quickestaiconblue.png"
                alt="Quickesta"
                width={32}
                height={32}
                className="rounded-md"
              />
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

            {renderForm()}

            <div className="text-center text-xs text-muted-foreground">
              Devam ederek <TermsDialog /> ve <PrivacyDialog />
              &apos;nı kabul etmiş olursunuz.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/assets/images/brand-images/quickestaiconwhite.png"
            alt="Quickesta"
            width={24}
            height={24}
            className="rounded-md bg-primary p-1"
          />
          <span>Quickesta</span>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hesap Oluşturun</CardTitle>
            <CardDescription>
              Bilgilerinizi girerek hemen başlayın
            </CardDescription>
          </CardHeader>
          <CardContent>{renderForm()}</CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground">
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
