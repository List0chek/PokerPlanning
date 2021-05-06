import React from 'react';
import MainHeader from '../../MainHeader/mainHeader';
import Footer from '../../Footer/footer';
import '../ErrorPage/errorPage.css';

const ErrorPage = () => {
  return (
    <>
      <main className='main_main'>
        <div className='main_block'>
          <p className='errorText'>{"This page doesn't exist!"}</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
