import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { News } from './widgets/news';
import { Layout, Typography } from 'antd';
import logo from '/logo.svg';
import './index.css';
import React from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: '0px' }}>
            HOT News
          </Title>
          <img src={logo} alt="logo" style={{ width: '32px', height: '32px' }} />
        </Header>
        <Content style={{ padding: '24px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <News />
        </Content>
      </Layout>
    </Provider>
  );
};
