import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { login } from '../../../queries';

const CLIENT_ID =
  '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const onError = error => {
  // TODO: display error to user
  console.error(error);
};

export default ({ history }) => {
  const [mutate] = useMutation(login);
  const onSuccess = async response => {
    const { data } = await mutate({
      variables: { token: response.Zi.id_token },
    });
    window.localStorage.setItem('session', data.login.session);
    // TODO: redirect to next in params
    // TODO: keep mobile in href
    history.push('/decks');
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
