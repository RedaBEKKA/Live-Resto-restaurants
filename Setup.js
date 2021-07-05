import React from 'react';
import OneSignal from 'react-native-onesignal';
import App from "./App"
const Setup = () => {
    React.useEffect( () => {
        // await inAppMessaging().setMessagesDisplaySuppressed(true);
         
        OneSignal.setAppId("7708be4e-5fd2-447b-8fe6-3846b76bbd24");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            this.OSLog("Prompt response:", response);
        });

        
       }, []);
    return (
        <App/>
    );
};

export default Setup;