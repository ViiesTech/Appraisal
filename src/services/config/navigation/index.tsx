import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import Signin from '../../../screens/Signin';
import Signup from '../../../screens/Signup';
import Onbording from '../../../screens/Onbording';
import VerifyAccount from '../../../screens/VerifyAccount';
import ForgotPassword from '../../../screens/ForgotPassword';
import ForgotPassVerify from '../../../screens/ForgotPassVerify';
import ResetPassword from '../../../screens/ResetPassword';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../../store/authSlice';
import BottomTabNavigation from '../BottomTabNavigation';
import TemplateLibrary from '../../../screens/TemplateLibrary';
import AssignmentDetails from '../../../screens/AssignmentDetails';
import ScheduleInspection from '../../../screens/ScheduleInspection';
import InspectionScheduled from '../../../screens/InspectionScheduled';
import InspectionChecklist from '../../../screens/InspectionChecklist';
import SubmitFinalReport from '../../../screens/SubmitFinalReport';
import EditProfile from '../../../screens/EditProfile';
import Settings from '../../../screens/Settings';

export type MainStackParamList = {
    Onbording: undefined;
    Signin: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    ForgotPassVerify: { email: string };
    ResetPassword: { email: string };
    VerifyAccount: { email: string };
    BottomTab: undefined;
    TemplateLibrary: undefined;
    AssignmentDetails: undefined;
    ScheduleInspection: undefined;
    InspectionScheduled: { date: string; time: string };
    InspectionChecklist: undefined;
    SubmitFinalReport: undefined;
    EditProfile: undefined;
    Settings: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigation = () => {
    const authToken = useSelector(selectAuthToken);
    console.log("navigation", authToken);

    return (
        <NavigationContainer>
            {authToken ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Onbording"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Onbording" component={Onbording} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
            <Stack.Screen name="ForgotPassVerify" component={ForgotPassVerify} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    );
};

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
            <Stack.Screen name="TemplateLibrary" component={TemplateLibrary} />
                <Stack.Screen name="AssignmentDetails" component={AssignmentDetails} />
                <Stack.Screen name="ScheduleInspection" component={ScheduleInspection} />
                <Stack.Screen name="InspectionScheduled" component={InspectionScheduled} />
                <Stack.Screen name="InspectionChecklist" component={InspectionChecklist} />
                <Stack.Screen name="SubmitFinalReport" component={SubmitFinalReport} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default MainNavigation;
