"use client"

import Image from "next/image"
import { useState } from "react"

interface FakeNewsCardProps {
  headline: string
  imageUrl: string
}

export function FakeNewsCard({ headline, imageUrl }: FakeNewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="relative aspect-video bg-[#F0F0EC] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#E8E8E4] animate-pulse" />
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFF8E7] to-[#FFEFD5]">
            <span className="text-6xl">☀️</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={headline}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 672px) 100vw, 672px"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2
          className="text-xl leading-relaxed text-[#2D2D2D] font-medium"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {headline}
        </h2>
      </div>
    </article>
  )
}
