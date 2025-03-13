import "./hero.css"

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">HELLO PEEPS</h1>
            <p className="hero-description">
              As a passionate full stack developer, I specialize in creating dynamic and responsive web applications. My
              expertise lies primarily in frontend development, where I bring ideas to life through innovative design
              and user- centric solutions.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/hero.jpg" alt="Hero illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}

