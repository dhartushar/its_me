"use client"

import { useState } from "react"
import "./header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <a href="#home" onClick={() => scrollToSection("home")}>
            Tushar Dhar
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button">
          <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#about" className="nav-link" onClick={() => scrollToSection("about")}>
            About
          </a>
          <a href="#portfolio" className="nav-link" onClick={() => scrollToSection("portfolio")}>
            Portfolio
          </a>
          <a href="#skills" className="nav-link" onClick={() => scrollToSection("skills")}>
            Skills
          </a>
          <a href="#journey" className="nav-link" onClick={() => scrollToSection("journey")}>
            Journey
          </a>
          <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-links">
              <a href="#about" className="mobile-nav-link" onClick={() => scrollToSection("about")}>
                About
              </a>
              <a href="#portfolio" className="mobile-nav-link" onClick={() => scrollToSection("portfolio")}>
                Portfolio
              </a>
              <a href="#skills" className="mobile-nav-link" onClick={() => scrollToSection("skills")}>
                Skills
              </a>
              <a href="#journey" className="mobile-nav-link" onClick={() => scrollToSection("journey")}>
                Journey
              </a>
              <button className="btn btn-primary full-width" onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

