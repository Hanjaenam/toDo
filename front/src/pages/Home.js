import React from 'react';
import Helmet from 'react-helmet';
import HomeTemplate from 'components/Home/Template';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HomeTemplate />
    </>
  );
};
export default Home;
