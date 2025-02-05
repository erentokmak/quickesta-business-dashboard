'use client'

const NotFound = () => {
  return (
    <main className="grow" id="content" role="content">
      <div className="container-fixed" id="content_container"></div>
      <div className="flex flex-col items-center justify-center h-[95%]">
        <div className="mb-10">
          <img
            alt="404 Hatası"
            className="dark:hidden max-h-[160px]"
            src="/assets/media/illustrations/19.svg"
          />
          <img
            alt="404 hatası"
            className="hidden dark:block max-h-[160px]"
            src="/assets/media/illustrations/19-dark.svg"
          />
        </div>
        <span className="badge badge-primary badge-outline mb-3">
          404 Hatası
        </span>
        <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">
          Aradığınız sayfa bulunamadı.
        </h3>
        <div className="text-md text-center text-gray-700 mb-10">
          İstenen sayfa bulunamadı. URL&apos;yi kontrol edin veya
          <br />
          <a
            className="text-primary font-medium hover:text-primary-active"
            href={'/'}
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </main>
  )
}

export default NotFound
