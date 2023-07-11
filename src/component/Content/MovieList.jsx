import { memo, useEffect, useRef, useState } from 'react';
import styles from './MovieList.module.css';
const API_KEY = 'cbcd2a2b77c4f889710975d63cd7bf27';
import MovieDetail from './MovieDetail';
function MovieList({ movies, title }) {
  const [show, setShow] = useState(false);

  const [movie, setMovie] = useState(null);

  const clickHandler = (e) => {
    if (e === movie) {
      setShow(false);
      setMovie(null);
    } else {
      setShow(true);
      setMovie(e);
    }
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <ul className={styles.movie_list}>
        {movies.results.map((movie) => (
          <li
            key={movie.id}
            className={styles.movie_item}
            onClick={(element) => {
              clickHandler(movie);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${
                title ? movie.backdrop_path : movie.poster_path
              }`}
            />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
      {show && <MovieDetail movie={movie} />}
    </div>
  );
}

export default MovieList;
