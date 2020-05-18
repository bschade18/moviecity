import React, { useEffect, useState } from 'react';
import Showcase from '../../elements/Showcase';
import Spinner from '../../elements/Spinner';
import Navbar from '../layout/Navbar';
import { Redirect } from 'react-router-dom';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';

const Home = ({ authSuccess, isAuthenticated }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    async function getMovie() {
      const result = await (await fetch(`${popularBaseUrl}&page=1`)).json();
      setImage(result.results[0]);
    }
    getMovie();
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }
  if (!image) return <Spinner />;

  return (
    <div>
      <Navbar authSuccess={authSuccess} />
      <Showcase image={`${imageUrl}${backdropSize}${image.backdrop_path}`} />
    </div>
  );
};

export default Home;
