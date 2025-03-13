import React, { useEffect } from 'react';
import Header from "./components/Header/header"
import Hero from "./components/Hero/hero"
import About from "./components/About/about"
import Portfolio from "./components/Portfolio/portfolio"
import Skills from "./components/Skills/skills"
import Journey from "./components/Journey/journey"
import Footer from "./components/Footer/footer"
import Contact from "./components/Contact/contact"
import emailjs from 'emailjs-com';

import "./app.css"

function App() {

  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init("process.env.userID");
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-container">
        <section id="about">
          <Hero />
        </section>
        {/* <section id="about">
          <About />
        </section> */}
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="journey">
          <Journey />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App

