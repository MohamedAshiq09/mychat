import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>Error {statusCode || 'Unknown'}</h1>
      <p>Sorry, something went wrong.</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
