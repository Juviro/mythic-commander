import React, { useContext } from 'react';
import { Select, Typography, message } from 'antd';
import { LockOutlined, GlobalOutlined, LinkOutlined } from '@ant-design/icons';

import Modal from 'antd/lib/modal/Modal';
import UserContext from 'components/Provider/UserProvider';
import Flex from '../Flex';
import CopyableText from '../CopyableText';

const VISIBILITY_OPTIONS = [
  {
    title: 'Only you',
    value: 'private',
    icon: <LockOutlined />,
  },
  {
    title: 'Everyone with this link',
    value: 'hidden',
    icon: <LinkOutlined />,
  },
  {
    title: 'Public',
    value: 'public',
    icon: <GlobalOutlined />,
  },
];

export default ({
  style,
  visibile: modalVisible,
  onClose,
  visibility,
  onChange: mutate,
  loading,
  title,
  description,
  publicUrl,
  hidePublic,
}) => {
  const { user, loading: loadingUser } = useContext(UserContext);

  const username = user?.username;

  const onChange = async (value: string) => {
    mutate(value);
    message.success('Successfully changed visibility!');
  };

  const isPubliclyVisible = visibility !== 'private';

  if (loading || loadingUser) return null;

  if (!username) {
    return (
      <div style={style}>
        <Typography.Text type="warning">
          You need a username to share your collection. Please reload the page to pick
          one.
        </Typography.Text>
      </div>
    );
  }

  const visibilityOptions = VISIBILITY_OPTIONS.filter(
    ({ value }) => !hidePublic || value !== 'public'
  );

  return (
    <Modal onOk={onClose} onCancel={onClose} open={modalVisible} title={title}>
      <Flex direction="column" style={style}>
        <Typography.Text style={{ fontSize: 12 }} strong>
          {description}
        </Typography.Text>
        <Select
          style={{ width: '100%', marginTop: 8 }}
          defaultValue={visibility}
          onChange={onChange}
          optionLabelProp=""
        >
          {visibilityOptions.map(({ title: option, value, icon }) => (
            <Select.Option key={value} value={value}>
              {icon}
              <Typography.Text
                style={{ marginLeft: 8, fontSize: 12, lineHeight: 1 }}
                strong
              >
                {option}
              </Typography.Text>
            </Select.Option>
          ))}
        </Select>
        {isPubliclyVisible && <CopyableText text={publicUrl} />}
      </Flex>
    </Modal>
  );
};
