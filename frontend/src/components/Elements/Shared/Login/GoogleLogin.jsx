import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import message from 'utils/message';
import { useHistory } from 'react-router';
import { getUser } from 'components/Provider/UserProvider/queries';
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
    await mutate({
      variables: { token: response.tokenId },
      update: (cache, { data }) => {
        const { session, user } = data.login;
        window.localStorage.setItem('session', session);
        cache.writeQuery({
          query: getUser,
          data: {
            user,
          },
        });
        const name = user.username ?? user.name;
        message(`Welcome <b>${name}</b>`);
      },
    });

    if (window.location.pathname === '/login') {
      push('/');
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
