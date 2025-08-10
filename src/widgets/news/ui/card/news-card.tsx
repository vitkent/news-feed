import React, { useState }  from 'react';
import { Card, Tag, Space, Typography, Flex } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import type { TNewsItem } from '../../../../shared/types';

const { Text, Paragraph, Title} = Typography;

export const NewsCard: React.FC<TNewsItem> = ({
  title,
  tags,
  reactions,
  body,
}) => {

  const [expanded, setExpanded] = useState(false);

  const setTagColor = (index: number) => {
    switch(index) {
      case 0:
        return 'success';
      case 1:
        return 'processing';
      case 2:
        return 'error';
      case 3:
        return 'warning';
      default:
        return 'default';
    }
  }

  return (
    <Card
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {Array.isArray(tags) && tags.length > 0 && (
        <Flex
          gap="small"
          wrap
          style={{ marginBottom: '16px' }}
        >
          {tags.map((tag, i) => (
            <Tag
              key={tag}
              color={setTagColor(i)}
              style={{ margin: '0px' }}
            >
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
      {title && (
        <Title level={5}>{title}</Title>
      )}
      {body && (
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: 'collapsible',
            symbol: expanded ? 'less' : 'more',
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
          copyable
        >
          {body}
        </Paragraph>
      )}
      <Flex
        justify="flex-end"
        gap="middle"
        style={{ marginTop: 'auto' }}
      >
        <Space>
          <LikeOutlined />
          <Text>{reactions.likes ?? 0}</Text>
        </Space>
        <Space>
          <DislikeOutlined />
          <Text>{reactions.dislikes ?? 0}</Text>
        </Space>
      </Flex>
    </Card>
  );
};
