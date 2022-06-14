// src/auth/auth0-provider-with-history.js

import React from "react";
// import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  // const navigator = useNavigate();
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//   const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const domain = "dev-xv9c9tpt.us.auth0.com";
  const clientId = "1151LSCcAqAdtfA1tjw52U5hFZo6TzHC";


  // const onRedirectCallback = (appState) => {
  //   navigator.push(appState?.returnTo || window.location.pathname);
  // };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
      // audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;