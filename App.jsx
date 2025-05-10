import React, { useState, useEffect } from 'react';

const translations = {
  en: {
    title: 'Hello',
    description: 'Welcome to our website.',
  },
  es: {
    title: 'Hola',
    description: 'Bienvenido a nuestro sitio web.',
  },
};

export default function App() {
  const [language, setLanguage] = useState('en');

  // Cargar idioma guardado en localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Guardar idioma al cambiar
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{translations[language].title}</h1>
      <p>{translations[language].description}</p>

      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
}
/*"use client"
            import CryptoExchange from "js/crypto-exchange"
            export default function Page() {
            return <CryptoExchange />
            }*/