import styles from './ResultList.module.css';
const API_KEY = 'cbcd2a2b77c4f889710975d63cd7bf27';

import { useState, useEffect } from 'react';
import MovieDetail from './MovieDetail';
function ResultList(props) {
  const [show, setShow] = useState(false);

  const [movie, setMovie] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.tenPhim}`
        );
        if (!response.ok) {
          throw new Error('Không có phim');
        }
        const data = await response.json();

        setData(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Lỗi API :Không tìm thấy phim');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.tenPhim]);
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  if (data.length === 0) {
    return (
      <div
        className={styles.error}
        style={{ marginTop: 50 + 'px', textAlign: 'center' }}
      >
        Không có phim phù hợp
      </div>
    );
  }
  console.log(data);
  const clickHandler = (e) => {
    if (e === movie) {
      setShow(false);
      setMovie(null);
    } else {
      console.log(e);
      setShow(true);
      setMovie(e);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Search Result</h3>
      <ul className={styles.movie_list}>
        {data.map((movie) => (
          <li
            key={movie.id}
            className={styles.movie_item}
            onClick={() => {
              clickHandler(movie);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          </li>
        ))}
      </ul>
      {show && <MovieDetail movie={movie} />}
    </div>
  );
}

export default ResultList;
