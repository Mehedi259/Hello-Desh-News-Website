import React, { createContext, useContext, useState, useEffect } from 'react'
import { NewsItem, NewsComment } from '../types/news'
import { INITIAL_NEWS } from '../data/mockNews'

interface NewsContextType {
  articles: NewsItem[]
  currentCategory: string
  setCurrentCategory: (slug: string) => void
  selectedArticle: NewsItem | null
  setSelectedArticle: (article: NewsItem | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  fontSizeLevel: 'normal' | 'large' | 'xlarge'
  cycleFontSize: () => void
  comments: Record<string, NewsComment[]>
  addComment: (articleId: string, authorName: string, content: string) => void
  newsletterSubscribers: string[]
  subscribeNewsletter: (email: string) => boolean
  toastMessage: string | null
  showToast: (msg: string) => void
  currentView: 'home' | 'detail' | 'category' | 'bookmarks'
  navigateToArticle: (article: NewsItem) => void
  navigateToCategory: (slug: string) => void
  navigateToHome: () => void
  navigateToBookmarks: () => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

const STORAGE_KEYS = {
  ARTICLES: 'hellodesh_articles',
  BOOKMARKS: 'hellodesh_bookmarks',
  COMMENTS: 'hellodesh_comments',
  SUBSCRIBERS: 'hellodesh_subscribers',
}

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles state
  const [articles, setArticles] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return INITIAL_NEWS
  })

  // Sync articles when updated in localStorage (e.g. from Admin Dashboard)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ARTICLES && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            setArticles(parsed)
          }
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // View state
  const [currentView, setCurrentView] = useState<'home' | 'detail' | 'category' | 'bookmarks'>('home')
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter(item => item !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(next))
      showToast(exists ? 'সংরক্ষণ তালিকা থেকে সরানো হয়েছে' : 'খবরটি সংরক্ষণ তালিকায় যুক্ত করা হয়েছে')
      return next
    })
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  // Font size for reading
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal')
  const cycleFontSize = () => {
    setFontSizeLevel(prev => {
      if (prev === 'normal') return 'large'
      if (prev === 'large') return 'xlarge'
      return 'normal'
    })
  }

  // Comments
  const [comments, setComments] = useState<Record<string, NewsComment[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS)
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {
      'march-7-pledge': [
        {
          id: 'c1',
          articleId: 'march-7-pledge',
          authorName: 'তানভীর আহমেদ',
          content: 'অসাধারণ প্রতিবেদন! ৭ মার্চের চেতনা আমাদের তরুণ সমাজের জন্য পথপ্রদর্শক।',
          createdAt: 'আজ, ০৫:১০ অপরাহ্ন',
          likes: 12
        },
        {
          id: 'c2',
          articleId: 'march-7-pledge',
          authorName: 'সাদিয়া তাসনিম',
          content: 'নতুন প্রজন্মের ঐক্যই আমাদের দেশকে এগিয়ে নেবে। ধন্যবাদ হ্যালো দেশকে এই সুন্দর প্রতিবেদনের জন্য।',
          createdAt: 'আজ, ০৫:৩০ অপরাহ্ন',
          likes: 8
        }
      ]
    }
  })

  const addComment = (articleId: string, authorName: string, content: string) => {
    const newComment: NewsComment = {
      id: `comment-${Date.now()}`,
      articleId,
      authorName: authorName.trim() || 'পাঠক',
      content: content.trim(),
      createdAt: 'এখন মাত্র',
      likes: 0
    }
    setComments(prev => {
      const nextList = [newComment, ...(prev[articleId] || [])]
      const updated = { ...prev, [articleId]: nextList }
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated))
      return updated
    })
    showToast('আপনার মন্তব্য সফলভাবে প্রকাশিত হয়েছে!')
  }

  // Newsletter
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const subscribeNewsletter = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) {
      showToast('অনুগ্রহ করে সঠিক ইমেইল ঠিকানা দিন')
      return false
    }
    if (newsletterSubscribers.includes(trimmed)) {
      showToast('আপনি ইতোমধ্যে সাবস্ক্রাইব করেছেন!')
      return false
    }
    const next = [...newsletterSubscribers, trimmed]
    setNewsletterSubscribers(next)
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(next))
    showToast('ধন্যবাদ! সফলভাবে সাবস্ক্রাইব করা হয়েছে।')
    return true
  }

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Navigation helpers
  const navigateToArticle = (article: NewsItem) => {
    setSelectedArticle(article)
    setCurrentView('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToCategory = (slug: string) => {
    setCurrentCategory(slug)
    setCurrentView('category')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHome = () => {
    setCurrentCategory('all')
    setSelectedArticle(null)
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToBookmarks = () => {
    setCurrentView('bookmarks')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <NewsContext.Provider
      value={{
        articles,
        currentCategory,
        setCurrentCategory,
        selectedArticle,
        setSelectedArticle,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        fontSizeLevel,
        cycleFontSize,
        comments,
        addComment,
        newsletterSubscribers,
        subscribeNewsletter,
        toastMessage,
        showToast,
        currentView,
        navigateToArticle,
        navigateToCategory,
        navigateToHome,
        navigateToBookmarks,
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}
