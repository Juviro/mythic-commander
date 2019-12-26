import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { login } from '../../queries';

const CLIENT_ID = '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const onError = error => {
  console.error(error);
  alert('Error logging in. Check the console for further information');
};

export default ({ history }) => {
  const [mutate] = useMutation(login);
  const onSuccess = async response => {
    const { data } = await mutate({ variables: { token: response.Zi.id_token } });
    window.localStorage.setItem('session', data.login.session);
    history.push('/collection');
  };

  return (
    <LoginWrapper>
      <GoogleLogin clientId={CLIENT_ID} onSuccess={onSuccess} onFailure={onError} cookiePolicy={'single_host_origin'} />
    </LoginWrapper>
  );
};
