"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { updateGoogleAnalyticsConsent } from '@/utils/analytics'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookie_consent')
    
    // Show popup if no consent status is stored
    if (!consentStatus) {
      // Small delay to prevent popup showing immediately on page load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    updateGoogleAnalyticsConsent(true) // Grant consent for analytics
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    updateGoogleAnalyticsConsent(false) // Deny consent for analytics
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-[#0c0c1d] border border-purple-900/30 rounded-xl shadow-xl p-4 md:p-5 animate-fade-in-up">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">Cookie Settings</h3>
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">
        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
        See our <Link href="/cookies" className="text-purple-400 hover:text-purple-300 underline">Cookie Policy</Link> for details.
      </p>
      
      <div className="flex gap-3">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-transparent border border-purple-900/50 hover:border-purple-900 rounded-lg transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  )
} 