import "./about.css"

export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="about-label">
              <span>Innovative</span>
            </div>
            <h2 className="about-title">Crafting Seamless Digital Experiences with Code</h2>
            <p className="about-description">
              I specialize in creating dynamic full stack web applications using the latest technologies. My expertise lies in both
              frontend and backend development, ensuring a holistic approach to web solutions.
            </p>

            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-header">
                  <span className="skill-icon">⚙️</span>
                  <h3 className="skill-title">Core Skills</h3>
                </div>
                <p className="skill-description">
                  JavaScript,Python, React, Node.js, and responsive design are my key strengths.
                </p>
              </div>

              <div className="skill-item">
                <div className="skill-header">
                  <span className="skill-icon">🛠️</span>
                  <h3 className="skill-title">Technologies Used</h3>
                </div>
                <p className="skill-description">
                  I leverage modern frameworks and tools to build efficient applications.
                </p>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img src="/assets/hero.jpg" alt="About section illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}

