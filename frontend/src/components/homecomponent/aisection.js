
import { useEffect } from "react"
import "../../static/aisection.css"
export default function AiSection() {
  useEffect(() => {
    // Animation for section elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".ai-visual, .ai-content, .ai-feature-box")
    elements.forEach((el) => {
      observer.observe(el)
    })

    // Floating elements animation
    const floatingElements = document.querySelectorAll(".ai-floating-element")
    floatingElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })

    // Chat message animation
    const chatMessages = document.querySelectorAll(".chat-message")
    chatMessages.forEach((message, index) => {
      setTimeout(
        () => {
          message.classList.add("show")
        },
        1000 + index * 800,
      )
    })

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <section className="ai-section">
      <div className="ai-container">
        <div className="ai-wrapper">
          {/* Visual representation */}
          <div className="ai-visual">
            <div className="chat-interface">
              <div className="chat-header">
                <div className="chat-bot">
                  <div className="bot-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                      <circle cx="12" cy="5" r="2"></circle>
                      <path d="M12 7v4"></path>
                      <line x1="8" y1="16" x2="8" y2="16"></line>
                      <line x1="16" y1="16" x2="16" y2="16"></line>
                    </svg>
                  </div>
                  <div className="bot-info">
                    <div className="bot-name"></div>
                    <div className="bot-status"></div>
                  </div>
                </div>
              </div>

              <div className="chat-body">
                <div className="chat-message user">
                  <div className="message-line"></div>
                  <div className="message-line short"></div>
                  <div className="message-line medium"></div>
                </div>

                <div className="chat-message bot">
                  <div className="message-line"></div>
                  <div className="message-line short"></div>
                  <div className="message-line medium"></div>
                </div>

                <div className="chat-message user">
                  <div className="message-line medium"></div>
                  <div className="message-line short"></div>
                </div>
              </div>

              <div className="chat-input">
                <div className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                    <path d="m17 4 2 2"></path>
                    <path d="m19 2 2 2"></path>
                  </svg>
                </div>
                <div className="input-field"></div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="ai-floating-element sparkles">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                <path d="m17 4 2 2"></path>
                <path d="m19 2 2 2"></path>
              </svg>
            </div>
            <div className="ai-floating-element brain">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="ai-content">
            <div className="ai-badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                <path d="m17 4 2 2"></path>
                <path d="m19 2 2 2"></path>
              </svg>
              AI-Powered
            </div>
            <h2 className="section-title">Intelligent Components</h2>
            <p className="ai-description">
              Leverage the power of artificial intelligence to enhance your user interfaces. Our AI-powered components
              learn and adapt to provide the best possible experience.
            </p>

            <div className="ai-feature-boxes">
              <div className="ai-feature-box">
                <div className="ai-feature-icon brain-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
                  </svg>
                </div>
                <h3 className="ai-feature-title">Smart Suggestions</h3>
                <p className="ai-feature-description">
                  AI-powered components that provide contextual suggestions based on user behavior and preferences,
                  enhancing the overall user experience.
                </p>
              </div>

              <div className="ai-feature-box">
                <div className="ai-feature-icon bot-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                  </svg>
                </div>
                <h3 className="ai-feature-title">Conversational UI</h3>
                <p className="ai-feature-description">
                  Implement natural language processing in your applications with our conversational components, making
                  interactions more intuitive.
                </p>
              </div>

              <div className="ai-feature-box">
                <div className="ai-feature-icon zap-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3 className="ai-feature-title">Automated Workflows</h3>
                <p className="ai-feature-description">
                  Streamline complex processes with AI-powered automation, reducing user friction and increasing
                  efficiency.
                </p>
              </div>
            </div>

            <button className="button primary-button ai-button">Explore AI Features</button>
          </div>
        </div>
      </div>
    </section>
  )
}

