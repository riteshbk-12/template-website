import { FaDownload, FaHeart, FaStar, FaEye } from "react-icons/fa"
// import "../styles/TemplateCard.css"
import "../../static/profilecss/templatecard.css"
const TemplateCard = ({ template, showRating = false, isDraft = false }) => {
  return (
    <div className="template-card1">
      <div className="template-image">
        <img src={template.image || "/placeholder.svg"} alt={template.title} />
        {isDraft && <div className="draft-badge">Draft</div>}
        <div className="template-overlay">
          <button className="view-btn">
            <FaEye /> View
          </button>
        </div>
      </div>

      <div className="template-info">
        <h3>{template.title}</h3>

        <div className="template-meta">
          <span className="category">{template.category}</span>

          {!isDraft ? (
            <div className="template-stats">
              <span className="downloads">
                <FaDownload />
                {template.downloads}
              </span>
              <span className="likes">
                <FaHeart />
                {template.likes}
              </span>
              {showRating && (
                <span className="rating">
                  <FaStar />
                  {template.rating}
                </span>
              )}
            </div>
          ) : (
            <div className="last-edited">Last edited: {template.lastEdited}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateCard

