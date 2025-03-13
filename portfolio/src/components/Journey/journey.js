import "./journey.css"

export default function Journey() {
  return (
    <section className="journey-section">
      <div className="container">
        <div className="journey-content">
          <div className="journey-intro">
            <span className="journey-label">Journey</span>
            <h2 className="journey-title">My Professional Journey in Tech</h2>
            <p className="journey-description">
              Explore my career timeline to see how I've evolved in the tech industry. Each milestone reflects my growth
              and dedication.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-year">2024</h3>
                  <h4 className="timeline-role">Software Developer (Crest Data)</h4>
                </div>
                <p className="timeline-description">
                  Currently, I am a full-stack developer specializing in frontend technologies. I am passionate about
                  creating user-friendly interfaces.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-year">2023</h3>
                  <h4 className="timeline-role">Developer Intern (BioXcel)</h4>
                </div>
                <p className="timeline-description">
                  During my internship, I worked on a variety of projects that helped me gain experience in software
                  development mainly WordPress and React. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

