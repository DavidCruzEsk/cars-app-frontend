import { useState, useContext } from "react";
import { useComponentVisible } from "../../Custom-Hooks/useComponentVisible.js";
import { LogInContext } from "../../Context/LogInContext";
import axios from "axios";

const Comment = ({ comment, setComments, carId }) => {
  const { user } = useContext(LogInContext);
  const [editComment, setEditComment] = useState(false);
  const { isComponentVisible, setIsComponentVisible, ref } =
    useComponentVisible(false);
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
          {!isComponentVisible ? (
            <>
              <button onClick={() => setEditComment(true)}>Edit</button>
              <button onClick={() => setIsComponentVisible(true)}>
                Delete
              </button>
            </>
          ) : (
            <>
              <p>Delete?</p>
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
            </>
          )}
        </div>
      )}
      {editComment && (
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setEditComment(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
