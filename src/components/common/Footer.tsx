import React from 'react'
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useNews } from '../../context/NewsContext'

export const Footer: React.FC = () => {
  const { navigateToHome, showToast } = useNews()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Logo */}
          <div onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="Hello Desh" style={{ height: '44px', objectFit: 'contain' }} />
          </div>

          {/* Quick links */}
          <ul className="footer-nav-links">
            <li onClick={() => showToast('আমাদের সম্পর্কে পেজ শীঘ্রই আসছে')}>আমাদের সম্পর্কে</li>
            <li onClick={() => showToast('বিজ্ঞাপনের তথ্যের জন্য যোগাযোগ করুন: ads@hellodesh.com')}>বিজ্ঞাপন</li>
            <li onClick={() => showToast('গোপনীয়তা নীতি সংরক্ষিত')}>গোপনীয়তা নীতি</li>
            <li onClick={() => showToast('যোগাযোগ: contact@hellodesh.com | হটলাইন: ১৬২৬৩')}>যোগাযোগ</li>
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
  )
}
