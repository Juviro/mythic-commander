import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import message from 'utils/message';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

import { login } from './queries';

const CLIENT_ID =
  '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';

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
      variables: { token: response.tokenId },
    });

    const { session, user } = data.login;
    Cookies.set('authToken', session, { expires: 365 });
    Cookies.set('authToken', session, { domain: window.location.host, expires: 365 });

    const name = user.username ?? user.name;
    message(`Welcome <b>${name}</b>`);

    if (window.location.pathname === '/login') {
      push('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <LoginWrapper>
      <GoogleLogin
        clientId={CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onError}
        cookiePolicy="single_host_origin"
      />
    </LoginWrapper>
  );
};
