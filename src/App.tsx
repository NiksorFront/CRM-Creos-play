import { useState } from 'react'
import './App.css'
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  const [language, setLanguage] = useState("Русский");

  return (
    <>
      <Header/>
      <main>
      </main>
      <Footer/>
    </>
  )
}

export default App
