import React from 'react'
import GoogleLogin from 'react-google-login'
import styled from 'styled-components'

const CLIENT_ID = '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com'

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const onError = error => {
  console.log('error', error)
  alert('Error logging in. Check the console for further information')
}

export default ({ history }) => {
  const onSuccess = response => {
    window.localStorage.setItem('token', response.Zi.id_token)
    history.push('/search')
  }

  return (
    <LoginWrapper>
      <GoogleLogin clientId={CLIENT_ID} onSuccess={onSuccess} onFailure={onError} cookiePolicy={'single_host_origin'} />
    </LoginWrapper>
  )
}
