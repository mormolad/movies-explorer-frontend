import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import React from 'react';

function UserPage() {
  const isLoggedIn = true;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Main />
      <Footer />
    </>
  );
}

export default UserPage;
