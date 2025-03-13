import "./hero.css"

export default function Hero() {

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Hey there, awesome humans!</h1>
            <p className="hero-description">
              As a passionate full stack developer, I specialize in creating dynamic and responsive web applications. My
              expertise lies primarily in frontend development, where I bring ideas to life through innovative design
              and user- centric solutions.
            </p>
          </div>
          <div className="hero-image">
            <img src="/assets/hero.jpg" alt="Hero illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}

