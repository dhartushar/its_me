import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Tushar Dhar</h3>
            <p className="footer-text">A passionate full-stack developer creating seamless digital experiences.</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="https://www.linkedin.com/in/tushar-dhar-28a8b622a/" target="_blank" rel="noopener noreferrer" className="footer-link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/dhartushar" target="_blank" rel="noopener noreferrer" className="footer-link">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li>
                <a href="#skills" className="footer-link">
                  Web Development/ Full Stack
                </a>
              </li>
              <li>
                <a href="#skills" className="footer-link">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#skills" className="footer-link">
                  AI applications
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>tushardhar2000@gmail.com</li>
              <li>+91 7838958509</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tushar Dhar</p>
        </div>
      </div>
    </footer>
  )
}

