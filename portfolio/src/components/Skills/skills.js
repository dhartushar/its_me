import "./skills.css"

export default function Skills() {
  const programmingLanguages = [
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // MySQL is the most common SQL-related icon
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ];
  
  const frontEndSkills = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
  ];
  
  const backendAndDatabases = [
    {
      name: "FastAPI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ];
  
  const devOpsAndTools = [
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Kubernetes",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "Splunk",
      icon: "/assets/splunk.svg", // No Devicon icon available
    },
  ];
  
  const otherTechSkills = [
    {
      name: "REST APIs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    },
    {
      name: "Ubuntu",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    },
  ];

  const SkillCategory = ({ title, skills }) => (
    <div className="skill-category">
      <h2 className="skill-category-title">{title}</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <img src={skill.icon || "/placeholder.svg"} alt={`${skill.name} icon`} className="skill-icon" />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <SkillCategory title="Programming Languages" skills={programmingLanguages} />
        <SkillCategory title="Front-End" skills={frontEndSkills} />
        <SkillCategory title="Backend and Databases" skills={backendAndDatabases} />
        <SkillCategory title="Tools" skills={devOpsAndTools} />
        <SkillCategory title="Other Tech Skills" skills={otherTechSkills} />
      </div>
    </section>
  )
}

