import React, { useState } from 'react'
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useNews } from '../../context/NewsContext'
import { InformationModal } from './InformationModal'

interface FooterProps {
  onOpenModal?: (type: 'about' | 'ads' | 'privacy' | 'contact') => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const { navigateToHome, showToast } = useNews()
  const [internalModalType, setInternalModalType] = useState<'about' | 'ads' | 'privacy' | 'contact' | null>(null)

  const handleOpen = (type: 'about' | 'ads' | 'privacy' | 'contact') => {
    if (onOpenModal) {
      onOpenModal(type)
    } else {
      setInternalModalType(type)
    }
  }

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            {/* Logo */}
            <div onClick={navigateToHome} style={{ cursor: 'pointer' }}>
              <img src="/logo.png" alt="Hello Desh" style={{ height: '44px', objectFit: 'contain' }} />
            </div>

            {/* Quick links */}
            <ul className="footer-nav-links">
              <li onClick={() => handleOpen('about')}>আমাদের সম্পর্কে</li>
              <li onClick={() => handleOpen('ads')}>বিজ্ঞাপন</li>
              <li onClick={() => handleOpen('privacy')}>গোপনীয়তা নীতি</li>
              <li onClick={() => handleOpen('contact')}>যোগাযোগ</li>
            </ul>

            {/* Social icons */}
            <div className="footer-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="YouTube"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="X (Twitter)"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="Instagram"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p>© 2026 HelloDesh. All rights reserved. সত্যের পক্ষে, মানুষের পাশে।</p>
          </div>
        </div>
      </footer>

      {/* Information Modal (fallback if not handled by parent) */}
      {!onOpenModal && (
        <InformationModal
          type={internalModalType}
          onClose={() => setInternalModalType(null)}
          showToast={showToast}
        />
      )}
    </>
  )
}
