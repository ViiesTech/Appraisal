import { View } from 'react-native';
import {
  Wrapper,
  HomeHeader,
  AppScrollView,
  StatsCards,
  TemplateLibraryCard,
  AppTabs,
  HomeOverview,
  HomeCertificates,
} from '../../components';
import styles from './style';
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <HomeHeader />
      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <StatsCards />
        <TemplateLibraryCard />
        <AppTabs
          variant="default"
          tab1Title="Overview"
          tab2Title="Certificates"
          tab2Icon="upload"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 'Overview' ? <HomeOverview /> : <HomeCertificates />}
      </AppScrollView>
    </Wrapper>
  );
};

export default Home;
