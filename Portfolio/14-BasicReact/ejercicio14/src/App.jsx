import React, { useState, useEffect } from "react";
import peliculas from "./data";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ name: "", text: "" });

  useEffect(() => {
    const moviesWithVotes = peliculas.map((movie) => ({
      ...movie,
      likes: 0,
      dislikes: 0,
    }));
    setMovies(moviesWithVotes);

    const initialComments = {};
    peliculas.forEach((movie) => {
      initialComments[movie.episode] = [];
    });
    setComments(initialComments);
  }, []);

  const handleLike = (index) => {
    const newMovies = [...movies];
    newMovies[index].likes += 1;
    setMovies(newMovies);
  };

  const handleDislike = (index) => {
    const newMovies = [...movies];
    newMovies[index].dislikes += 1;
    setMovies(newMovies);
  };

  const handleMoreClick = (character, episode) => {
    setSelectedCharacter({ ...character, episode });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacter && newComment.name && newComment.text) {
      setComments((prev) => ({
        ...prev,
        [selectedCharacter.episode]: [
          ...prev[selectedCharacter.episode],
          { ...newComment, timestamp: new Date().toLocaleString() },
        ],
      }));
      setNewComment({ name: "", text: "" });
    }
  };

  return (
    <div className="section">
      <div className="login-card">
        <h1>Star Wars Movies</h1>

        <div className="posts-container">
          {movies.map((movie, index) => (
            <div
              key={movie.episode}
              className={`card ${
                movie.best_character.affiliation === "Jedi" ||
                movie.best_character.affiliation === "Rebellion"
                  ? "bg-blue-600"
                  : "bg-red-600"
              }`}
              style={{
                "--hover-color":
                  movie.best_character.affiliation === "Jedi" ||
                  movie.best_character.affiliation === "Rebellion"
                    ? "#1d4ed8"
                    : "#dc2626",
              }}
            >
              <img src={movie.poster} alt={movie.title} className="poster" />
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>

              <div className="card-buttons">
                <button onClick={() => handleLike(index)} className="like-btn">
                  👍 <span>{movie.likes}</span>
                </button>
                <button
                  onClick={() => handleDislike(index)}
                  className="dislike-btn"
                >
                  👎 <span>{movie.dislikes}</span>
                </button>
              </div>

              <button
                onClick={() =>
                  handleMoreClick(movie.best_character, movie.episode)
                }
                className={`more-btn ${
                  movie.best_character.affiliation === "Jedi" ||
                  movie.best_character.affiliation === "Rebellion"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              >
                More...
              </button>
            </div>
          ))}
        </div>

        {selectedCharacter && (
          <div className="detail-section">
            <h2>{selectedCharacter.name}</h2>
            <div className="detail-container">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="detail-image"
              />
              <div className="detail-info">
                <p>{selectedCharacter.bio}</p>

                <div className="comments-section">
                  <h3>Comments</h3>
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                    <textarea
                      placeholder="Your comment"
                      value={newComment.text}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          text: e.target.value,
                        }))
                      }
                      required
                    />
                    <button type="submit">Add Comment</button>
                  </form>

                  <div className="comments">
                    {comments[selectedCharacter.episode]?.map(
                      (comment, index) => (
                        <div key={index} className="comment">
                          <div className="comment-name">{comment.name}</div>
                          <div className="comment-text">{comment.text}</div>
                          <div className="comment-timestamp">
                            {comment.timestamp}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
