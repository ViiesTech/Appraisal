import React, { useState } from 'react';
import {
  Wrapper,
  AppText,
  AppHeader,
  AppScrollView,
  TaskCard,
} from '../../components';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import { colors, sizes } from '../../services/utilities';
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../services/config/navigation';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

interface TaskItem {
  id: string;
  status: 'In Progress' | 'Scheduled' | 'Overdue' | 'Pending' | 'Completed';
  priority: 'High Priority' | 'Medium' | 'URGENT - Overdue' | 'Low';
  address: string;
  propertyName: string;
  progress: number;
  dueDate: string;
  statusColor: string;
  priorityColor: string;
  progressColor: string;
}

const taskItems: TaskItem[] = [
  {
    id: '1',
    status: 'In Progress',
    priority: 'High Priority',
    address: '1234 Oak Street, San Francisco, CA 94102',
    propertyName: 'ABC Real Estate',
    progress: 65,
    dueDate: 'Jan 25, 2026',
    statusColor: colors.statusBlue,
    priorityColor: colors.priorityRedText,
    progressColor: colors.statusBlue,
  },
  {
    id: '2',
    status: 'Scheduled',
    priority: 'Medium',
    address: '5678 Pine Avenue, Los Angeles, CA 90001',
    propertyName: 'XYZ Mortgage Corp',
    progress: 45,
    dueDate: 'Jan 20, 2026',
    statusColor: colors.error,
    priorityColor: colors.error,
    progressColor: colors.error,
  },
  {
    id: '4',
    status: 'Pending',
    priority: 'Low',
    address: '3456 Elm Street, Sacramento, CA 95814',
    propertyName: 'Global Appraisals',
    progress: 0,
    dueDate: 'Jan 28, 2026',
    statusColor: colors.statusGray,
    priorityColor: colors.statusGray,
    progressColor: colors.statusGray,
  },
  {
    id: '5',
    status: 'Completed',
    priority: 'Low',
    address: '7890 Birch Road, Oakland, CA 94601',
    propertyName: 'Metro Bank',
    progress: 100,
    dueDate: 'Jan 15, 2026',
    statusColor: colors.statusBlue,
    priorityColor: colors.statusBlue,
    progressColor: colors.statusBlue,
  },
];

const headerTabItems = ['All (5)', 'In Progress', 'Scheduled', 'Overdue'];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('All (5)');
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="My Tasks"
        showBackground
        hideBackButton
        description="Manage your assignments"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.headerTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.headerTabsContent}
            >
              {headerTabItems.map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.headerTab]}
                >
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={
                      activeTab === tab ? colors.blueNormal : colors.textLighter
                    }
                  >
                    {tab}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
      />

      {/* Header Tabs */}

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {taskItems.map(item => (
          <TaskCard
            key={item.id}
            status={item.status}
            priority={item.priority}
            address={item.address}
            progress={item.progress}
            dueDate={item.dueDate}
            organizationName={item.propertyName}
            statusColor={item.statusColor}
            priorityColor={item.priorityColor}
            progressColor={item.progressColor}
            variant="task"
                     onPress={() => navigation.navigate('AssignmentDetails')}
          />
        ))}
      </AppScrollView>
    </Wrapper>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  headerTabsContainer: {
    // backgroundColor: colors.white,
    paddingVertical: sizes.screenHeight * 0.01,
    paddingTop: sizes.screenHeight * 0.001,
  },
  headerTabsContent: {
    gap: sizes.screenWidth * 0.025,
  },
  headerTab: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.008,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#D1D5DC',
  },

  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.018,
    paddingBottom: sizes.screenHeight * 0.03,
    gap: sizes.screenHeight * 0.012,
  },
});
