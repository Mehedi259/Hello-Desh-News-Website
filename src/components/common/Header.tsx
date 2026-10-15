import React, { useState } from 'react'
import { Search, Menu, X, Bookmark, ExternalLink } from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { CATEGORIES } from '../../data/categories'

export const Header: React.FC = () => {
  const {
    currentCategory,
    navigateToCategory,
    navigateToHome,
    navigateToBookmarks,
    bookmarks,
    setIsSearchOpen
  } = useNews()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-top">
          {/* Logo */}
          <div className="brand-logo-wrap" onClick={navigateToHome}>
            <img src="/logo.png" alt="Hello Desh" className="brand-logo-img" />
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li
              className={`nav-item ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={navigateToHome}
            >
              হোম
            </li>
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className={`nav-item ${currentCategory === cat.slug ? 'active' : ''}`}
                onClick={() => navigateToCategory(cat.slug)}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Search Button */}
            <button
              className="action-btn"
              title="খবর অনুসন্ধান করুন"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} />
            </button>

            {/* Bookmarks Button */}
            <button
              className="action-btn"
              title="সংরক্ষিত খবর"
              onClick={navigateToBookmarks}
              style={{ position: 'relative' }}
            >
              <Bookmark size={18} />
              {bookmarks.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    background: 'var(--color-brand-red)',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '10px',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Admin Panel Link */}
            <a
              href="https://admin.hellodesh.com"
              target="_blank"
              rel="noreferrer"
              className="admin-link-btn"
              title="অ্যাডমিন ড্যাশবোর্ডে যান"
            >
              <span>অ্যাডমিন</span>
              <ExternalLink size={13} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="action-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu open">
          <ul className="mobile-nav-links">
            <li
              className={`nav-item ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => {
                navigateToHome()
                setMobileMenuOpen(false)
              }}
            >
              হোম
            </li>
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className={`nav-item ${currentCategory === cat.slug ? 'active' : ''}`}
                onClick={() => {
                  navigateToCategory(cat.slug)
                  setMobileMenuOpen(false)
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
