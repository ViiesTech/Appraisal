import React from 'react';
import { View } from 'react-native';
import { Wrapper, AppText, AppHeader, AppTabs, AppScrollView } from '../../components';
import styles from './style';
import { sizes } from '../../services/utilities';

const TemplateLibrary = () => {
    const [activeTab, setActiveTab] = React.useState('Month View');

    return (
        <Wrapper style={styles.container}
            statusBarTranslucent={true}
            statusBarHidden={true} barStyle="light-content"
            edges={['bottom', 'left', 'right']}
        >
            <AppHeader title="Template Library"
                description='Manage your inspections'
                // hideBackButton
                // showSearch={true}
                showBackground={true}
                showTabs={true}
                tabProps={{
                    tab1Title: 'Month View',
                    tab2Title: 'List View',
                    activeTab: activeTab,
                    setActiveTab: setActiveTab,
                    variant: 'shadow'
                }}
                containerStyle={{ paddingTop: sizes.screenHeight * 0.03, paddingBottom: sizes.screenHeight * 0.01 }}
            />
            {/* <View style={styles.centeredContent}> */}
            <AppScrollView >

                <AppTabs variant='default'
                    tab1Title="Overview" tab2Title="Certificates" tab2Icon="upload"
                    activeTab={activeTab} setActiveTab={setActiveTab} />
            </AppScrollView>
            <AppText style={styles.text}>Content will be here</AppText>
            {/* </View> */}
        </Wrapper>
    );
};

export default TemplateLibrary;
