import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";
import Alert from "react-bootstrap/Alert";

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

export const Error: React.FC<ErrorProps> = ({ error }) => (
  <Alert variant="danger">
    There has been an error, please reach out to support with the following
    information:
    <br />
    {JSON.stringify(error)}
  </Alert>
);
