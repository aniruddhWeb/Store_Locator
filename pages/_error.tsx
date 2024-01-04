import React from 'react';
import { NextPage } from 'next';
import { Error } from '../components/common/Error/Error';
import { BasicLayout } from '../components/common/BasicLayout/BasicLayout';

interface ErrorProps {
  statusCode: number;
  errorMessage?: string;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode, errorMessage }) => {
  return (
    <BasicLayout dark disabledHref>
      <Error status={statusCode} text={errorMessage} />
    </BasicLayout>
  );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const currentStatusCode = res?.statusCode || 500;
  const errorStatusCode = err?.statusCode;
  const errorMessage = err?.message;

  const statusCode = errorStatusCode || currentStatusCode;

  if (res) {
    res.statusCode = statusCode;
  }

  return { statusCode, errorMessage };
};

export default ErrorPage;
