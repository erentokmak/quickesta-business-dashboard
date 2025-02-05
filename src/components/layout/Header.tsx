import { useSession } from 'next-auth/react'
import primaryLogo from '@/assets/image/primaryLogo.png'
import { toast } from 'sonner'

const Header = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return toast.loading('Yükleniyor...')
  }

  return (
    <header
      className="flex lg:hidden items-center fixed z-10 top-0 start-0 end-0 shrink-0 bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark] h-[--tw-header-height]"
      id="header"
    >
      <div className="container-fixed flex items-center justify-between flex-wrap gap-3">
        <a>
          <img
            className="dark:hidden"
            src={primaryLogo.src}
            height={45}
            width={45}
          />
          <img
            className="hidden dark:block"
            src={primaryLogo.src}
            height={45}
            width={45}
          />
        </a>
        <button
          className="btn btn-icon btn-light btn-clear btn-sm -me-2"
          data-drawer-toggle="#sidebar"
        >
          <i className="ki-filled ki-menu"></i>
        </button>
      </div>
    </header>
  )
}

export default Header
