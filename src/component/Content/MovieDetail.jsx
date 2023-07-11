import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';
import styles from './MovieDetail.module.css';
function MovieDetail({ movie }) {
  console.log(movie);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requets = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=cbcd2a2b77c4f889710975d63cd7bf27`
        );
        if (!response.ok) {
          throw new Error('Gọi API lỗi');
        }
        const data = await response.json();
        const filteredVideo = data.results.filter((video) => {
          return (
            (video.site === 'YouTube' && video.type === 'Trailer') ||
            video.type === 'Teaser'
          );
        });
        console.log(filteredVideo);
        if (filteredVideo.length > 0) {
          setVideo(filteredVideo[0].key);
        } else {
          setVideo(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error);
        setLoading(false);
      }
    };
    requets();
  }, [movie.id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  let src;
  if (video) {
    src = (
      <iframe
        width="50%"
        height="100%"
        src={`https://www.youtube.com/embed/${video}`}
        allowFullScreen
      ></iframe>
    );
  } else {
    src = (
      <img
        width="50%"
        src={`https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path
        }`}
      />
    );
  }
  console.log(video);
  // const src = `https://www.youtube.com/embed/${key}`;
  return (
    <div className={styles.movie_detail}>
      <div className={styles.content}>
        <h1>{movie.name || movie.original_title} </h1>
        <h3>Release Date : {movie.release_date || movie.first_air_date}</h3>
        <h3>Vote :{movie.vote_average || movie.vote_average}/10</h3>
        <p>{movie.overview}</p>
      </div>
      {src}
    </div>
  );
}

export default MovieDetail;
