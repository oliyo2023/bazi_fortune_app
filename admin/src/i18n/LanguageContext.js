import React, { useState, createContext, useContext } from 'react';
import { chineseMessages } from './chinese';
import { englishMessages } from './english';

const LanguageContext = createContext();

export const languages = {
  zh: {
    name: '中文',
    messages: chineseMessages,
    flag: '🇨🇳'
  },
  en: {
    name: 'English',
    messages: englishMessages,
    flag: '🇺🇸'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('zh');

  const switchLanguage = (lang) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('admin_language', lang);
    }
  };

  const getCurrentMessages = () => {
    return languages[currentLanguage].messages;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      switchLanguage,
      getCurrentMessages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};