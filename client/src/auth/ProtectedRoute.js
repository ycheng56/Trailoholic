import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function ProtectedRoute({ Component }) {
  const MyProtectedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => <Loading />,
  });
  return <MyProtectedComponent />;
}
