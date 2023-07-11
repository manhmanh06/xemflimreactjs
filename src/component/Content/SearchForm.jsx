import { useState } from 'react';
import styles from './SearchForm.module.css';

function SearchForm(props) {
  const [nameMovie, setNameMovie] = useState('');
  const [isValid, setIsValid] = useState(false);

  const valueInputChangeHandler = (e) => {
    e.target.value.trim().length > 0 ? setIsValid(false) : setIsValid(true);
    setNameMovie(e.target.value);
  };
  const searchMovie = () => {
    if (nameMovie.trim() !== '') {
      props.onName(nameMovie);
    } else {
      setIsValid(true);
    }
  };
  const resetInput = () => {
    setNameMovie('');
    setIsValid(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nhập tên phim cần tìm..."
          value={nameMovie}
          onChange={valueInputChangeHandler}
        />
        {isValid && (
          <p style={{ color: 'red', paddingLeft: 20 }}>
            Bạn cần nhập tên phim cần tìm
          </p>
        )}
      </div>
      <div className={styles.btn}>
        <button className={styles.reset} onClick={resetInput}>
          RESET
        </button>
        <button className={styles.search} onClick={searchMovie}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
