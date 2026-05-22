import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { Wrapper, AppHeader } from '../../components';
import { colors, sizes } from '../../utils';

// Read status bar height once at module level — static, never changes
// const STATUS_BAR_HEIGHT =
//   Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
};
const DocumentViewer = ({ route }: any) => {
  const { url, title = 'Document' } = route.params ?? {};
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    url ?? '',
  )}`;

  const [loading, setLoading] = useState(true);
  console.log('Title', title);

  return (
    <Wrapper
      style={styles.container}
      barStyle="dark-content"
    >
      {/* Fixed top padding using static StatusBar height — avoids SafeAreaView
          recalculating insets when the WebView triggers system UI changes */}
      <View>
        <AppHeader containerStyle={headerContainerStyle} title={title} />
      </View>
      <View style={styles.webviewWrapper}>
        <WebView
          source={{ uri: viewerUrl }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.blueNormal} />
          </View>
        )}
      </View>
    </Wrapper>
  );
};

export default DocumentViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  webviewWrapper: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
