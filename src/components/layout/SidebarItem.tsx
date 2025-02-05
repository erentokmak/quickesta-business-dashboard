import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface SidebarItemProps {
  title: string
  icon?: React.ReactNode
  subItems?: Array<{
    title: string
    href: string
  }>
  isExpanded?: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  subItems,
  isExpanded = false,
}) => {
  const router = useRouter()

  return (
    <div
      className="menu-item"
      data-menu-item-toggle="accordion"
      data-menu-item-trigger="click"
    >
      <div
        className={`menu-link gap-2.5 py-2 px-2.5 rounded-md border border-transparent ${isExpanded ? 'menu-item-show' : ''}`}
      >
        <span className="menu-icon items-start text-gray-600 text-lg menu-item-here:text-gray-800 menu-item-show:text-gray-800 menu-link-hover:text-gray-800">
          {icon}
        </span>
        <span className="menu-title font-medium text-sm text-gray-800 menu-item-here:text-gray-900 menu-item-show:text-gray-900 menu-link-hover:text-gray-900">
          {title}
        </span>
        {subItems && (
          <span className="menu-arrow text-gray-600 menu-item-here:text-gray-800 menu-item-show:text-gray-800 menu-link-hover:text-gray-800">
            <i className="ki-filled ki-down text-xs menu-item-show:hidden"></i>
            <i className="ki-filled ki-up text-xs hidden menu-item-show:inline-flex"></i>
          </span>
        )}
      </div>

      {subItems && (
        <div
          className={`menu-accordion gap-px ps-7 ${isExpanded ? 'show' : ''}`}
        >
          {subItems.map((item) => (
            <div key={item.href} className="menu-item">
              <Link
                href={item.href}
                className={`menu-link py-2 px-2.5 rounded-md border border-transparent menu-item-active:border-gray-200 menu-item-active:bg-light menu-link-hover:bg-light menu-link-hover:border-gray-200 ${
                  router.pathname === item.href ? 'menu-item-active' : ''
                }`}
              >
                <span className="menu-bullet">
                  <span className="bullet bullet-dot"></span>
                </span>
                <span className="menu-title text-2sm text-gray-800 menu-item-active:text-gray-900 menu-link-hover:text-gray-900">
                  {item.title}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
