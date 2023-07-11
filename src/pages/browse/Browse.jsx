import React from 'react';
import styles from './Browse.module.css';
import Header from '../../component/Header/Header';
import MovieList from '../../component/Content/MovieList';
import Footer from '../../component/Footer/Footer';
import { useEffect, useState } from 'react';

function Browse() {
  const API_KEY = 'cbcd2a2b77c4f889710975d63cd7bf27';
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllAPIs = async () => {
      try {
        const responses = await Promise.all(
          Object.values(requests).map((apiURL) =>
            fetch(`https://api.themoviedb.org/3${apiURL}`)
          )
        );
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        const result = Object.keys(requests).reduce((acc, key, index) => {
          acc[key] = data[index];
          return acc;
        }, {});
        return result;
      } catch (error) {
        console.error('Error fetching APIs:', error);
        throw new Error('Lỗi API , vui lòng quay lại sau');
      }
    };

    // Sử dụng fetchAllAPIs
    fetchAllAPIs()
      .then((apiData) => {
        setData(apiData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }
  return (
    <div className={styles.app}>
      <Header data={data.fetchNetflixOriginals} />
      <MovieList movies={data.fetchNetflixOriginals} />
      <MovieList movies={data.fetchTrending} title={'Xu hướng'} />
      <MovieList movies={data.fetchTopRated} title={'Xếp hạng cao'} />
      <MovieList movies={data.fetchActionMovies} title={'Hành động'} />
      <MovieList movies={data.fetchComedyMovies} title={'Hài'} />
      <MovieList movies={data.fetchHorrorMovies} title={'Kinh dị'} />
      <MovieList movies={data.fetchRomanceMovies} title={'Lãng mạn'} />
      <MovieList movies={data.fetchDocumentaries} title={'Tài liệu'} />
      <Footer />
    </div>
  );
}

export default Browse;
