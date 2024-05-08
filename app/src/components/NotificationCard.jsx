import React from 'react';
import { Avatar, Card } from 'react-native-paper';
import { RPH } from '../utils/dimensions';

const LeftContent = props => <Avatar.Icon {...props} icon="pill" />;

const NotificationCard = ({ data }) => {
  return (
    <Card
      elevation={3}
      style={{ marginBottom: RPH(2), paddingVertical: RPH(1) }}>
      <Card.Title
        title={`${data.title} | ${new Date(data.createdAt).toLocaleDateString(
          'en-GB'
        )}`}
        subtitle={data.description}
        subtitleNumberOfLines={2}
        left={LeftContent}
      />
    </Card>
  );
};

export default NotificationCard;
