import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import message from 'utils/message';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';

import { login } from './queries';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const onError = (error) => {
  console.error(error);
  throw new Error('Error logging in. Please try again');
};

export default () => {
  const [mutate] = useMutation(login);
  const { push } = useHistory();

  const onSuccess = async (response) => {
    const { data } = await mutate({
      variables: { token: response.credential },
    });

    const { session, user } = data.login;
    Cookies.set('authToken', session, { expires: 365 });
    Cookies.set('authToken', session, { domain: window.location.host, expires: 365 });

    const name = user.username ?? user.name;
    message(`Welcome <b>${name}</b>`);

    const redirectUrl = new URLSearchParams(window.location.search).get('redirect');

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else if (window.location.pathname === '/login') {
      push('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <LoginWrapper>
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </LoginWrapper>
  );
};
