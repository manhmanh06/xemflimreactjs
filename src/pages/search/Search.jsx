import React from 'react';
import styles from './Search.module.css';
import Navbar from '../../component/Header/Navbar';
import SearchForm from '../../component/Content/SearchForm';
import ResultList from '../../component/Content/ResultList';

import { useState } from 'react';

const Search = () => {
  const [tenPhim, setTenphim] = useState('');
  const nameMovie = (ten) => {
    setTenphim(ten);
  };
  return (
    <div className={styles.app}>
      <Navbar />
      <SearchForm onName={nameMovie} />
      {tenPhim && <ResultList tenPhim={tenPhim} />}
    </div>
  );
};

export default Search;
