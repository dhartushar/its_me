import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Logo</h3>
            <p className="footer-text">A passionate full-stack developer creating seamless digital experiences.</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#portfolio" className="footer-link">
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li>
                <a href="#skills" className="footer-link">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#skills" className="footer-link">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#skills" className="footer-link">
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>email@example.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Web Dev Street, Digital City</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

