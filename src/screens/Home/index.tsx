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
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetProfileQuery } from '../../redux/api/apiSlice';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { user } = useSelector((state: any) => state.auth);
  // Trigger a fresh profile fetch on mount; extraReducers in authSlice
  // merges the response into state.auth.user automatically.
  useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true });
  const performance = user?.performance || {};

  const homeStats = [
    {
      id: 1,
      title: 'Total Assigned',
      value: performance.totalOrders?.toString() || '0',
      icon: 'file-text',
    },
    {
      id: 2,
      title: 'Active Tasks',
      value: performance.activeOrders?.toString() || '0',
      icon: 'clock',
    },
    {
      id: 3,
      title: 'Completed',
      value: performance.completedOrders?.toString() || '0',
      icon: 'award',
    },
    {
      id: 4,
      title: 'Success Rate',
      value:
        performance.completionRatePercent !== undefined
          ? `${performance.completionRatePercent}%`
          : '0%',
      icon: 'trending-up',
    },
  ];

  return (
    <Wrapper
      style={styles.container}
    >
      <HomeHeader />
      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <StatsCards data={homeStats} />
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
