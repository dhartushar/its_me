import "./portfolio.css"

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "REAL-TIME CHAT APPLICATION",
      description: "Developed a real-time chat application using React and Socket.io.",
    },
    {
      id: 2,
      title: "E-commerce Platform Development",
      description: "Developed a scalable e-commerce platform using React, FastAPI and mongoDB.",
 },
    {
      id: 3,
      title: "Modern Web 3.0 Blockchain App",
      description: "Developed a modern web 3.0 blockchain application using Solidity and React.",
    },
  ]

  return (
    <section className="portfolio-section">
      <div className="container">
        <div className="portfolio-header">
          <h2 className="portfolio-title">PROJECTS</h2>
          <p className="portfolio-description">
            Explore my diverse portfolio that highlights my skills as a full stack developer. Each project reflects my
            commitment to quality and innovation.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

