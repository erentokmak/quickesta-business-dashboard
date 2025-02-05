import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ActionToolbarProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
}

const ActionToolbar: React.FC<ActionToolbarProps> = ({
  title,
  breadcrumbs = [],
  actions,
}) => {
  return (
    <div className="pb-5">
      <div className="container-fixed flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center flex-wrap gap-1 lg:gap-5">
          <h1 className="font-medium text-lg text-gray-900">{title}</h1>
          {breadcrumbs.length > 0 && (
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
        {actions && (
          <div className="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default ActionToolbar
