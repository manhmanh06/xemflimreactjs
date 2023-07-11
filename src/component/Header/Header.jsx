import Navbar from './Navbar';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
function Header({ data }) {
  const [randomImage, setRandomImage] = useState({});
  useEffect(() => {
    getRandomImage();
    const interval = setInterval(getRandomImage, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * data.results.length);

    const randomImage = data.results[randomIndex];
    setRandomImage(randomImage);
  };
  console.log(randomImage);
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.banner}>
        <img
          src={
            randomImage.backdrop_path
              ? `https://image.tmdb.org/t/p/original${randomImage.backdrop_path}`
              : `https://image.tmdb.org/t/p/original/boyxwftKk9NvsXBjmzJWrRveeYO.jpg`
          }
        />
      </div>
      <div className={styles.content}>
        <h1>{randomImage.name}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{randomImage.overview}</p>
      </div>
    </header>
  );
}

export default Header;
