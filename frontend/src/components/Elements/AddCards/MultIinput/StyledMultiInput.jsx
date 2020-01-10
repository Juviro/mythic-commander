import styled from 'styled-components';
import { Icon } from 'antd';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
`;

export const StyledInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
`;

export const StyledStatus = styled.div`
  width: 30px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  height: 21.1px;
  width: 100%;
`;

export const StyledIcon = styled(Icon)`
  display: flex;
  justify-content: flex-end;
`;
