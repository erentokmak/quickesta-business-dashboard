import React, { useState, useMemo, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { SidebarItem } from './SidebarItem'
import Link from 'next/link'

const Sidebar = () => {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const handleCollapse = () => {
    setIsAnimating(true)
    setIsCollapsed(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const handleExpand = () => {
    setIsAnimating(true)
    setIsCollapsed(false)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        const searchInput =
          document.querySelector<HTMLInputElement>('#sidebar-search')
        searchInput?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const menuItems = useMemo(
    () => [
      {
        title: 'Siparişler',
        icon: 'ki-handcart',
        subItems: [{ title: 'Siparişler', href: '/dashboard/orders' }],
      },
      {
        title: 'Müşteri İşlemleri',
        icon: 'ki-profile-circle',
        subItems: [{ title: 'Müşteriler', href: '/dashboard/customers' }],
      },
      {
        title: 'Bayi İşlemleri',
        icon: 'ki-shop',
        subItems: [
          { title: 'Bayiler', href: '/dashboard/dealers' },
          {
            title: 'Bayiye Stok Atama',
            href: '/dashboard/dealer-stock-assignment',
          },
        ],
      },
      {
        title: 'Adres İşlemleri',
        icon: 'ki-address-book',
        subItems: [
          {
            title: 'Adresten Bayi Kapsamı',
            href: '/dashboard/dealersbyaddress',
          },
        ],
      },
      {
        title: 'Stok İşlemleri',
        icon: 'ki-lots-shopping',
        subItems: [{ title: 'Stok', href: '/dashboard/stocks' }],
      },
    ],
    [],
  )

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm)
      return menuItems.map((item) => ({ ...item, isExpanded: false }))

    return menuItems
      .map((item) => {
        const titleMatch = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        const subItemMatch = item.subItems.some((subItem) =>
          subItem.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        return {
          ...item,
          isExpanded: titleMatch || subItemMatch,
          isVisible: titleMatch || subItemMatch,
        }
      })
      .filter((item) => item.isVisible)
  }, [menuItems, searchTerm])

  return (
    <>
      <style jsx global>{`
        :root {
          --sidebar-margin: ${isCollapsed ? '105px' : '270px'};
          --sidebar-transition: width 0.1s ease-in-out;
        }

        #sidebar {
          transition: var(--sidebar-transition);
        }

        .sidebar-collapsed {
          width: 105px !important;
        }

        .sidebar-expanded {
          width: 270px !important;
        }
      `}</style>
      {isCollapsed ? (
        <div
          className={`fixed top-0 bottom-0 z-20 hidden lg:flex flex-col items-stretch shrink-0 bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark] sidebar-collapsed ${isAnimating ? 'sidebar-animating' : ''}`}
          data-drawer="true"
          data-drawer-class="drawer drawer-start flex"
          data-drawer-enable="true|lg:false"
          id="sidebar"
        >
          <div
            className="hidden lg:flex items-center justify-center shrink-0 pt-3.5 pb-3.5"
            id="sidebar_header"
          >
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleExpand()
              }}
            >
              <img
                className="dark:hidden min-h-[42px] cursor-pointer"
                src="/assets/primaryLogo.png"
                height={42}
                width={42}
              />
              <img
                className="hidden dark:block min-h-[42px] cursor-pointer"
                src="/assets/primaryLogo.png"
                height={42}
                width={42}
              />
            </Link>
          </div>

          <div
            className="scrollable-y-hover grow gap-2.5 shrink-0 flex items-center pt-5 lg:pt-0 ps-3 pe-3 lg:pe-0 flex-col"
            data-scrollable="true"
            data-scrollable-dependencies="#sidebar_header,#sidebar_footer"
            data-scrollable-height="auto"
            data-scrollable-offset="80px"
            data-scrollable-wrappers="#sidebar_menu_wrapper"
            id="sidebar_menu_wrapper"
          >
            <div
              className="menu flex flex-col gap-2.5 grow text-center"
              data-menu="true"
              id="sidebar_menu"
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="menu-item"
                  data-menu-item-offset="-10px, 14px"
                  data-menu-item-placement="right-start"
                  data-menu-item-toggle="dropdown"
                  data-menu-item-trigger="click|lg:hover"
                >
                  <div className="menu-link rounded-[9px] border border-transparent menu-item-here:border-gray-200 menu-item-here:bg-light menu-link-hover:bg-light menu-link-hover:border-gray-200 w-[62px] h-[60px] flex flex-col justify-center items-center gap-1 p-2 grow">
                    <span className="menu-icon menu-item-here:text-primary menu-item-active:text-primary menu-link-hover:text-primary text-gray-600">
                      <i className={`ki-filled ${item.icon} text-1.5xl`}></i>
                    </span>
                    <span className="menu-title menu-item-here:text-primary menu-item-active:text-primary menu-link-hover:text-primary font-medium text-xs text-gray-600">
                      {item.title.split(' ')[0]}
                    </span>
                  </div>
                  <div className="menu-default menu-dropdown gap-0.5 w-[220px] scrollable-y-auto lg:overflow-visible max-h-[50vh]">
                    {item.subItems.map((subItem, subIndex) => (
                      <div key={subIndex} className="menu-item">
                        <Link className="menu-link" href={subItem.href}>
                          <span className="menu-title">{subItem.title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col gap-5 items-center shrink-0 pb-3.5"
            id="sidebar_footer"
          >
            <div className="menu cursor-pointer" data-menu="true">
              <div
                className="menu-item menu-item-dropdown"
                data-menu-item-offset="-20px, 28px"
                data-menu-item-placement="right-end"
                data-menu-item-toggle="dropdown"
                data-menu-item-trigger="click|lg:click"
              >
                <div className="menu-toggle btn btn-icon rounded-full">
                  <div className="size-8 rounded-full inline-flex items-center justify-center text-sm font-semibold border border-primary-clarity bg-primary-light text-primary">
                    {session?.user?.name?.[0]?.toUpperCase() || 'K'}
                  </div>
                </div>
                <div className="menu-dropdown menu-default light:border-gray-300 w-screen max-w-[250px]">
                  <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm text-gray-800 font-semibold leading-none">
                          {session?.user?.name}
                        </span>
                        <button className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                          {session?.user?.email}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="menu-separator"></div>
                  <div className="flex flex-col">
                    <div className="menu-item">
                      <Link className="menu-link" href="/profile">
                        <span className="menu-icon">
                          <i className="ki-filled ki-profile-circle"></i>
                        </span>
                        <span className="menu-title">Profilim</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link className="menu-link" href="/settings">
                        <span className="menu-icon">
                          <i className="ki-filled ki-setting-2"></i>
                        </span>
                        <span className="menu-title">Ayarlar</span>
                      </Link>
                    </div>
                  </div>
                  <div className="menu-separator"></div>
                  <div className="flex flex-col">
                    <div className="menu-item mb-0.5">
                      <div className="menu-link">
                        <span className="menu-icon">
                          <i className="ki-filled ki-moon"></i>
                        </span>
                        <span className="menu-title">Koyu Mod</span>
                        <label className="switch switch-sm">
                          <input
                            data-theme-state="dark"
                            data-theme-toggle="true"
                            name="check"
                            type="checkbox"
                            defaultValue={1}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="menu-item px-4 py-1.5">
                      <button
                        className="btn btn-sm btn-light justify-center"
                        onClick={() => signOut()}
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`fixed top-0 bottom-0 z-20 hidden lg:flex flex-col shrink-0 w-[--tw-sidebar-width] bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark] no-scrollbar sidebar-expanded ${isAnimating ? 'sidebar-animating' : ''}`}
          data-drawer="true"
          data-drawer-class="drawer drawer-start flex top-0 bottom-0"
          data-drawer-enable="true|lg:false"
          id="sidebar"
        >
          <div id="sidebar_header">
            <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
              <Link href="/">
                <img
                  className="dark:hidden h-[42px]"
                  src="/assets/primaryLogo.png"
                  height={42}
                  width={42}
                />
                <img
                  className="hidden dark:inline-block h-[42px]"
                  src="/assets/primaryLogo.png"
                  height={42}
                  width={42}
                />
              </Link>
              <div className="menu menu-default grow" data-menu="true">
                <div
                  className="menu-item grow"
                  data-menu-item-offset="0px, 15px"
                  data-menu-item-placement="bottom-start"
                >
                  <div className="menu-label cursor-pointer text-gray-900 font-medium grow justify-between">
                    <div className="flex items-center gap-2">
                      <Link href="/" className="flex items-center gap-2">
                        <span className="text-base font-medium text-gray-900 grow justify-start cursor-pointer">
                          Abant Su Dashboard
                        </span>
                      </Link>
                    </div>
                    <button
                      onClick={handleCollapse}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="ki-filled ki-left-square text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2.5 px-3.5 mb-1">
              <div className="input">
                <i className="ki-filled ki-magnifier"></i>
                <input
                  id="sidebar-search"
                  className="min-w-0"
                  placeholder="Menü Arayınız..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="text-2sm text-gray-700 text-nowrap hidden lg:inline">
                  <code className="px-2 py-1 text-xs font-medium rounded border border-gray-300 bg-gray-100 shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    Ctrl
                  </code>
                  <span className="text-gray-500 mx-1">+</span>
                  <code className="px-2 py-1 text-xs font-medium rounded border border-gray-300 bg-gray-100 shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    K
                  </code>
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-stretch grow shrink-0 justify-center my-5"
            id="sidebar_menu"
          >
            <div
              className="scrollable-y-auto light:[--tw-scrollbar-thumb-color:var(--tw-content-scrollbar-color)] grow"
              data-scrollable="true"
              data-scrollable-dependencies="#sidebar_header, #sidebar_footer"
              data-scrollable-height="auto"
              data-scrollable-offset="0px"
              data-scrollable-wrappers="#sidebar_menu"
            >
              <div
                className="menu flex flex-col w-full gap-1.5 px-3.5"
                data-menu="true"
                data-menu-accordion-expand-all="false"
                id="sidebar_primary_menu"
              >
                {filteredMenuItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    title={item.title}
                    icon={<i className={`ki-filled ${item.icon}`} />}
                    subItems={item.subItems}
                    isExpanded={item.isExpanded}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex flex-center justify-between shrink-0 ps-4 pe-3.5 mb-3.5"
            id="sidebar_footer"
          >
            <div className="menu" data-menu="true">
              <div
                className="menu-item"
                data-menu-item-offset="-10px, 15px"
                data-menu-item-placement="right-end"
                data-menu-item-toggle="dropdown"
                data-menu-item-trigger="click|lg:click"
              >
                <div className="menu-toggle btn btn-icon rounded-full">
                  <div className="size-8 rounded-full inline-flex items-center justify-center text-sm font-semibold border border-primary-clarity bg-primary-light text-primary">
                    {session?.user?.name?.[0]?.toUpperCase() || 'K'}
                  </div>
                </div>
                <div className="menu-dropdown menu-default light:border-gray-300 w-screen max-w-[250px]">
                  <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm text-gray-800 font-semibold leading-none">
                          {session?.user?.name}
                        </span>
                        <button className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                          {session?.user?.email}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="menu-separator"></div>
                  <div className="flex flex-col">
                    <div className="menu-item">
                      <Link className="menu-link" href="/profile">
                        <span className="menu-icon">
                          <i className="ki-filled ki-profile-circle"></i>
                        </span>
                        <span className="menu-title">Profilim</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link className="menu-link" href="/settings">
                        <span className="menu-icon">
                          <i className="ki-filled ki-setting-2"></i>
                        </span>
                        <span className="menu-title">Ayarlar</span>
                      </Link>
                    </div>
                  </div>
                  <div className="menu-separator"></div>
                  <div className="flex flex-col">
                    <div className="menu-item mb-0.5">
                      <div className="menu-link">
                        <span className="menu-icon">
                          <i className="ki-filled ki-moon"></i>
                        </span>
                        <span className="menu-title">Koyu Mod</span>
                        <label className="switch switch-sm">
                          <input
                            data-theme-state="dark"
                            data-theme-toggle="true"
                            name="check"
                            type="checkbox"
                            defaultValue={1}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="menu-item px-4 py-1.5">
                      <button
                        className="btn btn-sm btn-light justify-center"
                        onClick={() => signOut()}
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                className="btn btn-icon btn-icon-lg size-8 hover:bg-light hover:text-primary text-gray-600"
                onClick={() => signOut()}
              >
                <i className="ki-filled ki-exit-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
