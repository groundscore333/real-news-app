"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { FakeNewsCard } from "./components/card"
import { LoadingCard } from "./components/loading"

interface Headline {
  id: string
  headline: string
  imageUrl: string
}

const LOADING_MESSAGES = [
  "Making up something wonderful...",
  "Inventing good news...",
  "Fabricating joy...",
  "Generating happiness...",
  "Brewing positivity...",
  "Cooking up smiles..."
]

export default function FakeNewsFeed() {
  const [headlines, setHeadlines] = useState<Headline[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0])
  const [refreshing, setRefreshing] = useState(false)
  const [cursor, setCursor] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Initial load - start at random position
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const randomStart = Math.floor(Math.random() * 77)
        const res = await fetch(`/api/feed?cursor=${randomStart}&limit=5`)
        const data = await res.json()
        setHeadlines(data.headlines)
        setCursor(data.nextCursor)
      } catch (error) {
        console.error('Failed to fetch headlines:', error)
      } finally {
        setInitialLoading(false)
      }
    }
    fetchInitial()
  }, [])

  const loadMore = useCallback(async () => {
    if (loading || initialLoading) return
    setLoading(true)
    setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)])

    try {
      const res = await fetch(`/api/feed?cursor=${cursor}&limit=3`)
      const data = await res.json()
      setHeadlines(prev => [...prev, ...data.headlines])
      setCursor(data.nextCursor)
    } catch (error) {
      console.error('Failed to load more:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, initialLoading, cursor])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)])

    try {
      const res = await fetch('/api/feed', { method: 'POST' })
      const data = await res.json()
      setHeadlines(data.headlines)
      setCursor(data.nextCursor)
    } catch (error) {
      console.error('Failed to refresh:', error)
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMore])

  return (
    <div className="fake-news-app min-h-screen bg-[#E5E7E2]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#E5E7E2]/95 backdrop-blur-sm border-b border-[#D4D6D1]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-1 text-2xl font-black tracking-tight">
                <span className="bg-[#CC0000] text-white px-2 py-0.5 rounded-sm">REAL</span>
                <span className="text-[#003366]">NEWS</span>
              </h1>
              <p className="text-xs text-[#6B6B6B] mt-0.5 tracking-wide uppercase">
                trust me bro
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#CC0000]/10 hover:bg-[#CC0000]/20 transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
              aria-label="Refresh feed"
            >
              <span className="text-xl" aria-hidden="true">{refreshing ? "⏳" : "🔄"}</span>
              <span className="text-sm font-medium text-[#2D2D2D]">{refreshing ? "Loading..." : "Refresh"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {(refreshing || initialLoading) && (
          <div className="text-center py-8">
            <p className="text-[#6B6B6B] italic" style={{ fontFamily: 'var(--font-serif)' }}>
              {loadingMessage}
            </p>
          </div>
        )}

        <div className="space-y-10">
          {headlines.map((headline) => (
            <Link key={headline.id} href={`/article/${headline.id}`}>
              <FakeNewsCard
                headline={headline.headline}
                imageUrl={headline.imageUrl}
              />
            </Link>
          ))}
        </div>

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="py-8">
          {loading && <LoadingCard message={loadingMessage} />}
        </div>
      </main>
    </div>
  )
}
