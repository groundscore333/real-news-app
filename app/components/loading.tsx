"use client"

interface LoadingCardProps {
  message?: string
}

export function LoadingCard({ message = "Fabricating joy..." }: LoadingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-[#F5F5F2] to-[#E8E8E4]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl opacity-30">☀️</div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-5 bg-[#F0F0EC] rounded-full w-full" />
          <div className="h-5 bg-[#F0F0EC] rounded-full w-11/12" />
          <div className="h-5 bg-[#F0F0EC] rounded-full w-4/5" />
        </div>
        <div className="h-4 bg-[#F0F0EC] rounded-full w-1/3 mt-4" />
      </div>

      {/* Loading message */}
      <div className="px-6 pb-6">
        <p
          className="text-sm text-[#A0A0A0] italic text-center"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {message}
        </p>
      </div>
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#F0F0EC]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F5C542] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">☀️</span>
        </div>
      </div>
      <p
        className="text-sm text-[#8B8B8B] italic"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Generating happiness...
      </p>
    </div>
  )
}
