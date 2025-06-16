

import { useState } from "react"
import { ThumbsUp, MessageSquare } from "lucide-react"
import "../../static/iconinfocss/commentsection.css"

export default function CommentSection() {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "This button component is exactly what I needed for my project! The hover effect is really smooth.",
      date: "2 days ago",
      likes: 12,
      replies: [
        {
          id: 101,
          author: "Mike Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I agree! I've been using it in my dashboard and it works great.",
          date: "1 day ago",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Would be nice to have a disabled state option as well. Otherwise, it's perfect!",
      date: "3 days ago",
      likes: 8,
      replies: [],
    },
  ])

  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newComment,
      date: "Just now",
      likes: 0,
      replies: [],
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  const handleSubmitReply = (commentId) => {
    if (!replyContent.trim()) return

    const newReply = {
      id: Date.now(),
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: replyContent,
      date: "Just now",
      likes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        }
      }
      return comment
    })

    setComments(updatedComments)
  }

  return (
    <div className="comment-section">
      <h2 className="section-title">Comments</h2>

      <div className="comment-form">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-textarea"
        />
        <div className="form-actions">
          <button className="post-button" onClick={handleSubmitComment}>
            Post Comment
          </button>
        </div>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">
              <img src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              <div className="comment-actions">
                <button className="action-button" onClick={() => handleLike(comment.id)}>
                  <ThumbsUp className="icon" />
                  <span>{comment.likes}</span>
                </button>
                <button
                  className="action-button"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <MessageSquare className="icon" />
                  <span>Reply</span>
                </button>
              </div>

              {replyingTo === comment.id && (
                <div className="reply-form">
                  <textarea
                    placeholder={`Reply to ${comment.author}...`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="reply-textarea"
                  />
                  <div className="reply-actions">
                    <button className="cancel-button" onClick={() => setReplyingTo(null)}>
                      Cancel
                    </button>
                    <button className="reply-button" onClick={() => handleSubmitReply(comment.id)}>
                      Reply
                    </button>
                  </div>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <div className="reply-avatar">
                        <img src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                      </div>
                      <div className="reply-content">
                        <div className="reply-header">
                          <span className="reply-author">{reply.author}</span>
                          <span className="reply-date">{reply.date}</span>
                        </div>
                        <p className="reply-text">{reply.content}</p>
                        <button className="like-button">
                          <ThumbsUp className="icon-small" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

