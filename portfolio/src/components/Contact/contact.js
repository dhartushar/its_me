"use client"

import { useState, useRef } from "react"
import "./contact.css"
// We'll need to install emailjs-com
// npm install emailjs-com

import emailjs from "emailjs-com"

export default function Contact() {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "tushardhar2000@gmail.com", // This can be hardcoded in your EmailJS template
    }

    // Send the email using EmailJS
    emailjs
      .send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_USER_ID)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text)
        setFormStatus({
          submitted: true,
          success: true,
          message: "Thank you for your message! I will get back to you soon.",
        })

        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("FAILED...", error)
        setFormStatus({
          submitted: true,
          success: false,
          message:
            "Oops! Something went wrong. Please try again later or contact me directly at tushardhar2000@gmail.com.",
        })
        setIsLoading(false)
      })
  }
  console.log("serive ID", process.env.REACT_APP_EMAILJS_SERVICE_ID)
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-description">
          Interested in collaborating or learning more about my work? Feel free to reach out using the form below.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-icon">📧</span>
              <div>
                <h3 className="contact-info-title">Email</h3>
                <p className="contact-info-text">tushardhar2000@gmail.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-icon">📱</span>
              <div>
                <h3 className="contact-info-title">Phone</h3>
                <p className="contact-info-text">+91 7838958509</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-icon">📍</span>
              <div>
                <h3 className="contact-info-title">Location</h3>
                <p className="contact-info-text">Ahmedabad &lt;-&gt; Gurgaon</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className={`form-message ${formStatus.success ? "form-success-message" : "form-error-message"}`}>
                {formStatus.message}
              </div>
            ) : (
              <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Hello, I'd like to discuss a project..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
