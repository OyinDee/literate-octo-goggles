import React, { createContext, useState, useContext } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved language preference
    return localStorage.getItem('language') || 'ja'
  })

  const toggleLanguage = () => {
    const newLanguage = language === 'ja' ? 'en' : 'ja'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
