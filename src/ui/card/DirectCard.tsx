import Link from 'next/link'
import React from 'react'

interface DirectCardProps {
  icon: string
  title: string
  description: string
  href: string
  linkText?: string
}

const DirectCard: React.FC<DirectCardProps> = ({
  icon,
  title,
  description,
  href,
  linkText = 'Sayfaya Git',
}) => {
  return (
    <div className="card px-5 lg:px-7.5 h-full bg-[length:85%] [background-position:9rem_-3.5rem] bg-no-repeat channel-stats-bg">
      <div className="flex flex-col gap-4 pt-6">
        <i className={`ki-filled ${icon} text-2xl text-gray-600`}></i>
        <div className="flex flex-col gap-2.5 mb-2">
          <h3 className="text-base font-medium leading-none text-gray-900">
            {title}
          </h3>
          <span className="text-2sm text-gray-800 leading-5">
            {description}
          </span>
        </div>
      </div>
      <div className="flex mb-4 items-center gap-1 cursor-pointer">
        <Link
          className="btn text-primary hover:text-primary-active px-0"
          href={href}
        >
          {linkText}
        </Link>
        <i className="ki-filled ki-right text-primary text-xs"></i>
      </div>
    </div>
  )
}

export default DirectCard
