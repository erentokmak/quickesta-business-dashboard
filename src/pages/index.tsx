import React from 'react'
import { DirectCard } from '@/ui/card'
import { menuItems } from '@/constants/menuItems'

export default function HomePage() {
  return (
    <div className="grid gap-y-5 lg:gap-7.5 items-stretch">
      <div className="w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7.5 h-full items-stretch">
          {menuItems.map((item, index) => (
            <DirectCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
