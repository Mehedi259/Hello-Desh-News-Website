import React, { useState } from 'react'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { NewsItem } from '../../types/news'

export const HeroBanner: React.FC = () => {
  const { articles, navigateToArticle } = useNews()

  // Find hero / featured news
  const heroArticles = articles.filter((a) => a.isHero || a.isFeatured).slice(0, 3)
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeArticle: NewsItem = heroArticles[currentIndex] || articles[0]

  if (!activeArticle) return null

  return (
    <section className="hero-section">
      <div className="hero-card">
        {/* Left Content Column */}
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="badge-pill badge-breaking">সর্বশেষ</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                background: 'var(--color-primary-soft)',
                padding: '2px 8px',
                borderRadius: '9999px'
              }}
            >
              ব্রেকিং নিউজ
            </span>
          </div>

          <h1
            className="hero-title"
            onClick={() => navigateToArticle(activeArticle)}
          >
            {activeArticle.title}
          </h1>

          <p className="hero-excerpt">{activeArticle.excerpt}</p>

          <div className="hero-meta-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} />
              {activeArticle.timeAgo}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={14} />
              {activeArticle.category}
            </span>
          </div>

          <button
            className="hero-btn"
            onClick={() => navigateToArticle(activeArticle)}
          >
            <span>আরও পড়ুন</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Image Column */}
        <div
          className="hero-image-wrap"
          onClick={() => navigateToArticle(activeArticle)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={activeArticle.image}
            alt={activeArticle.title}
            className="hero-image"
          />
          {/* Carousel Dots */}
          <div
            className="hero-dots"
            onClick={(e) => e.stopPropagation()}
          >
            {heroArticles.map((_, idx) => (
              <span
                key={idx}
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                title={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
