import { useState, useContext } from "react";
import { useComponentVisible } from "../../Custom-Hooks/useComponentVisible.js";
import { LogInContext } from "../../Context/LogInContext";
import axios from "axios";

const Comment = ({ comment, setComments, carId }) => {
  const { user } = useContext(LogInContext);
  const [editComment, setEditComment] = useState(false);
  const {isComponentVisible, setIsComponentVisible, ref} = useComponentVisible(false);
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const USERS = import.meta.env.VITE_BASE_URL_USERS;
  const { firstName, lastName, comment: text, userId, id } = comment;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${USERS}/edit-comment`, {
        userId: user.id,
        id: id,
        comment: updatedComment,
        carId: carId,
      })
      .then((res) => {
          setEditComment(false);
          setComments(res.data);
          setUpdatedComment("");
      });
  };

  return (
    <div key={comment.id} className="comment">
      {!editComment && (
        <div className="comment__details">
          <p>
            {firstName} {lastName[0]}. said "{text}"
          </p>
        </div>
      )}
      {user.id === userId && !editComment && (
        <div className="comment__buttons" ref={ref}>
          <button onClick={() => setEditComment(true)}>Edit</button>
          <div className="delete-comment">
            <button onClick={() => setIsComponentVisible(true)}>Delete</button>
            {isComponentVisible && (
              <div className="delete-comment__window">
                <button
                  onClick={() => {
                    axios
                      .delete(`${USERS}/delete-comment/${id}/${carId}`)
                      .then((res) => {
                          setComments(res.data);
                      });
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setIsComponentVisible(false)}>No</button>
              </div>
            )}
          </div>
        </div>
      )}
      {editComment && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
          <button onClick={() => setEditComment(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
