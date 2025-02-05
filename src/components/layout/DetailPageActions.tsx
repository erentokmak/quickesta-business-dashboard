import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { menuItems } from '@/constants/menuItems'
import { DetailPageActionsProps } from '@/types'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { slideAnimation, getTransition } from '@/utils/animations'

function DetailPageActions({
  title,
  breadcrumbs,
  sections,
  isHaveSaveButton,
  onSave,
}: DetailPageActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [activeSection, setActiveSection] = useState<string>(
    sections?.[0]?.id || '',
  )

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm) return []

    const filtered = menuItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Eğer sonuç varsa dropdown'ı aç
    if (filtered.length > 0 && !isDropdownOpen) {
      setIsDropdownOpen(true)
      setSelectedIndex(-1) // Reset selection when results change
    }

    return filtered
  }, [searchTerm, isDropdownOpen])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setSelectedIndex(-1) // Reset selection when search term changes

    // Arama terimi boşsa dropdown'ı kapat
    if (!value.trim()) {
      setIsDropdownOpen(false)
    } else {
      setIsDropdownOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || filteredMenuItems.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredMenuItems.length - 1 ? prev + 1 : prev,
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredMenuItems.length) {
          const selectedItem = filteredMenuItems[selectedIndex]
          router.push(selectedItem.href)
          setIsDropdownOpen(false)
          setSearchTerm('')
          setSelectedIndex(-1)
        }
        break
    }
  }

  const handleSearchFocus = () => {
    setIsDropdownOpen(true)
  }

  const handleSearchBlur = () => {
    // Dropdown'ı hemen kapatmayalım, kullanıcı seçim yapabilsin
    setTimeout(() => {
      setIsDropdownOpen(false)
      setSelectedIndex(-1)
    }, 200)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (searchInputRef.current) {
          searchInputRef.current.focus()
          // Dropdown'ı açmak için click event'ini tetikle
          const menuToggle = document.querySelector(
            '.menu-toggle',
          ) as HTMLElement
          menuToggle?.click()
          setIsDropdownOpen(true)
        }
      }

      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
        searchInputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements =
        sections
          ?.map((section) => document.getElementById(section.id || ''))
          .filter(Boolean) || []

      if (sectionElements.length === 0) return

      const scrollPosition = window.scrollY + 200 // Offset for header

      for (const element of sectionElements) {
        if (!element) continue
        const { offsetTop, offsetHeight } = element

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(element.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <motion.div
      variants={slideAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={getTransition()}
    >
      <header
        className="flex items-center transition-[height] shrink-0 bg-[--tw-header-bg] dark:bg-coal-500 h-[--tw-header-height]"
        data-sticky="true"
        data-sticky-class="transition-[height] fixed z-10 top-0 left-0 right-0 shadow-sm backdrop-blur-md bg-white/70 dark:bg-coal-500/70 dark:border-b dark:border-b-light"
        data-sticky-name="header"
        data-sticky-offset="100px"
        id="header"
      >
        <div className="container-fixed flex lg:justify-between items-center gap-2.5">
          <div className="flex items-center gap-1 lg:w-[500px] grow lg:grow-0">
            <button
              className="btn btn-icon btn-light btn-clear btn-sm -ms-2.5 lg:hidden"
              data-drawer-toggle="#navbar"
            >
              <i className="ki-filled ki-menu"></i>
            </button>
            <div className="flex items-center gap-2">
              <Link
                href={
                  breadcrumbs && breadcrumbs.length > 1
                    ? breadcrumbs[breadcrumbs.length - 2].href || '/'
                    : '/'
                }
              >
                <button className="btn btn-icon btn-outline btn-primary">
                  <i className="ki-outline ki-left-square"></i>
                </button>
              </Link>
              <div className="border-e border-gray-200 h-5"></div>
              <div className="flex items-center flex-wrap gap-1 lg:gap-5">
                <h1 className="font-medium text-lg text-gray-900">{title}</h1>
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <div className="flex items-center gap-1 text-sm font-normal">
                    {breadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span className="text-gray-400 text-sm">/</span>
                        )}
                        {item.href ? (
                          <Link
                            className="text-gray-700 hover:text-primary"
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            className={
                              index === breadcrumbs.length - 1
                                ? 'text-gray-900'
                                : 'text-gray-700'
                            }
                          >
                            {item.label}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="menu" data-menu="true">
            <div
              className="menu-item"
              data-menu-item-offset="-7px, 10px"
              data-menu-item-placement="bottom-start"
              data-menu-item-toggle="dropdown"
              data-menu-item-trigger="click|lg:click"
            >
              <div className="menu-toggle">
                <div className="input input-md">
                  <i className="ki-filled ki-magnifier"></i>
                  <input
                    ref={searchInputRef}
                    className="min-w-0 focus:outline-none"
                    placeholder="Menü Arayınız..."
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
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
              <div className="menu-dropdown menu-default light:border-gray-300">
                {isDropdownOpen &&
                  searchTerm &&
                  filteredMenuItems.length > 0 && (
                    <div className="flex flex-col">
                      {filteredMenuItems.map((item, index) => (
                        <div
                          key={index}
                          className={`menu-item ${
                            index === selectedIndex ? 'active' : ''
                          }`}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <Link
                            href={item.href}
                            className="menu-link flex items-center gap-1"
                            onClick={() => {
                              setIsDropdownOpen(false)
                              setSearchTerm('')
                              setSelectedIndex(-1)
                            }}
                          >
                            <span className="menu-icon">
                              <i
                                className={`ki-filled ${item.icon} text-gray-500`}
                              ></i>
                            </span>
                            <span className="menu-title text-xs">
                              {item.title}
                            </span>
                            <span className="menu-desc text-gray-500 text-xs ml-3">
                              {item.description}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3.5 lg:w-[500px] justify-end">
            <div className="menu" data-menu="true">
              <div className="menu-item">
                {isHaveSaveButton && (
                  <button className="btn btn-sm btn-dark" onClick={onSave}>
                    Kaydet
                  </button>
                )}
              </div>
            </div>
            <div className="menu" data-menu="true">
              <div className="menu-item">
                <Link
                  href={
                    breadcrumbs && breadcrumbs.length > 1
                      ? breadcrumbs[breadcrumbs.length - 2].href || '/'
                      : '/'
                  }
                  className="btn btn-sm btn-light"
                >
                  İptal
                </Link>
              </div>
            </div>
            <div className="border-e border-gray-200 h-5"></div>
            <div className="flex items-center gap-2 me-0.5">
              <div
                className="dropdown"
                data-dropdown="true"
                data-dropdown-offset="-7px, 10px"
                data-dropdown-placement="bottom-end"
                data-dropdown-trigger="click|lg:click"
              ></div>
              <div className="menu" data-menu="true">
                <div
                  className="menu-item"
                  data-menu-item-offset="-7px, 10px"
                  data-menu-item-placement="bottom-end"
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
        </div>
      </header>
      <motion.div
        variants={slideAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={getTransition(0.1)}
        className="bg-[--tw-navbar-bg] dark:bg-[--tw-navbar-bg-dark] hidden lg:flex lg:items-stretch border-y border-gray-300 dark:border-t-light dark:border-light lg:mb-5"
        data-drawer="true"
        data-drawer-class="drawer drawer-start fixed z-10 top-0 bottom-0 w-full mr-5 max-w-[250px] p-5 lg:p-0 overflow-auto"
        data-drawer-enable="true|lg:false"
        id="navbar"
      >
        <div className="container-fixed flex flex-wrap justify-between items-center gap-2 px-0 lg:px-7.5">
          <div
            className="menu items-stretch flex-col lg:flex-row gap-5 lg:gap-7.5 grow lg:grow-0"
            data-menu="true"
            id="mega_menu"
          >
            {sections?.map((section) => {
              return (
                <div
                  key={section.id}
                  className={`menu-item ${activeSection === section.id ? 'active' : ''}`}
                >
                  <a
                    href={`#${section.id}`}
                    className="menu-link lg:py-3.5 border-b border-b-transparent menu-item-active:border-b-gray-800 text-gray-800 menu-item-hover:text-gray-900 menu-item-active:text-gray-900 menu-item-here:border-b-gray-800 menu-item-here:text-gray-900 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveSection(section.id || '')
                      const element = document.getElementById(section.id || '')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className="menu-title font-medium text-gray-800 text-sm">
                      {section.title}
                    </span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DetailPageActions
