import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import ImageViewing from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/Feather';
import { AppText } from '..';
import { colors, fontFamily, fontSize, sizes } from '../../utils';

export interface Certificate {
  _id: string;
  url: string;
  size: string;
  resourceType: string;
  format: string;
  originalName: string;
  uploadedAt: string;
}

interface CertificateViewerProps {
  certificate: Certificate | null;
  visible: boolean;
  onClose: () => void;
}

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const FORMAT_COLORS: Record<string, string> = {
  pdf: '#EF4444',
  docx: '#2563EB',
  doc: '#2563EB',
  jpg: '#10B981',
  jpeg: '#10B981',
  png: '#10B981',
  gif: '#10B981',
  webp: '#10B981',
};

const getFormatColor = (fmt: string) =>
  FORMAT_COLORS[fmt?.toLowerCase()] ?? colors.statusBlue;

const CertificateViewer = ({
  certificate,
  visible,
  onClose,
}: CertificateViewerProps) => {
  const [webLoading, setWebLoading] = useState(true);
  const [webError, setWebError] = useState(false);
  const [webviewKey, setWebviewKey] = useState(0);
  const retryCountRef = useRef(0);
  const insets = useSafeAreaInsets();

  // Reset state every time the modal opens or the certificate changes so
  // stale error/loading flags from a previous open never bleed through.
  useEffect(() => {
    if (visible && certificate) {
      setWebLoading(true);
      setWebError(false);
      retryCountRef.current = 0;
      setWebviewKey(k => k + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, certificate?._id]);

  // Google Docs viewer often responds with HTTP 204 on the first request while
  // it processes the file server-side. Auto-retry up to 3 times before giving
  // up and showing the error screen.
  const handleHttpError = useCallback(() => {
    if (retryCountRef.current < 3) {
      retryCountRef.current += 1;
      setWebviewKey(k => k + 1);
    } else {
      setWebLoading(false);
      setWebError(true);
    }
  }, []);

  const handleRetry = useCallback(() => {
    setWebError(false);
    setWebLoading(true);
    retryCountRef.current = 0;
    setWebviewKey(k => k + 1);
  }, []);

  if (!certificate) return null;

  const fmt = certificate.format?.toLowerCase();
  const isImage = IMAGE_FORMATS.includes(fmt);

  // ── Image viewer ────────────────────────────────────────────────────────────
  if (isImage) {
    return (
      <ImageViewing
        images={[{ uri: certificate.url }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={onClose}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
        presentationStyle="fullScreen"
        renderImage={({ source, style }) => (
          <Image
            source={source as any}
            style={[style, { width: sizes.screenWidth, height: sizes.screenHeight, resizeMode: 'contain' }]}
          />
        )}
        HeaderComponent={() => (
          <View style={[styles.imageHeader, { paddingTop: insets.top + sizes.screenHeight * 0.015 }]}>
            <TouchableOpacity onPress={onClose} style={styles.imageCloseBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Icon name="x" size={22} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.imageHeaderTitle}>
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Bold}
                color={colors.white}
                numberOfLines={1}
                style={styles.headerFileName}
              >
                {certificate.originalName}
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color="rgba(255,255,255,0.7)"
              >
                {certificate.size}
              </AppText>
            </View>
            <View style={[styles.formatBadge, { backgroundColor: getFormatColor(fmt) }]}>
              <AppText fontSize={fontSize.tiny} fontFamily={fontFamily.Bold} color={colors.white}>
                {fmt.toUpperCase()}
              </AppText>
            </View>
          </View>
        )}
      />
    );
  }

  // ── PDF / DOCX viewer via Google Docs embedded viewer ──────────────────────
  // Google Docs viewer handles PDF, DOCX, DOC, PPTX, XLSX seamlessly
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(certificate.url)}`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.docContainer}>
        {/* ── Header ── */}
        <View style={[styles.docHeader, { paddingTop: insets.top + sizes.screenHeight * 0.015 }]}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon name="arrow-left" size={20} color={colors.textDark} />
          </TouchableOpacity>

          <View style={styles.docHeaderInfo}>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              numberOfLines={1}
              style={styles.docHeaderFileName}
            >
              {certificate.originalName}
            </AppText>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
            >
              {certificate.size}
            </AppText>
          </View>

          <View style={[styles.formatBadge, { backgroundColor: getFormatColor(fmt) }]}>
            <AppText fontSize={fontSize.tiny} fontFamily={fontFamily.Bold} color={colors.white}>
              {fmt.toUpperCase()}
            </AppText>
          </View>
        </View>

        {/* ── WebView content ── */}
        <View style={styles.webviewContainer}>
          {webLoading && !webError && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.blueNormal} />
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
                style={styles.loadingText}
              >
                Loading document…
              </AppText>
            </View>
          )}

          {webError ? (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={40} color={colors.borderLight} />
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Bold}
                color={colors.textLighter}
                style={styles.errorTitle}
              >
                Unable to load document
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
                style={styles.errorSub}
              >
                Try opening it in your browser instead.
              </AppText>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={handleRetry}
              >
                <AppText fontSize={fontSize.medium} fontFamily={fontFamily.Bold} color={colors.white}>
                  Retry
                </AppText>
              </TouchableOpacity>
            </View>
          ) : (
            <WebView
              key={webviewKey}
              source={{ uri: viewerUrl }}
              style={styles.webview}
              onLoadEnd={() => setWebLoading(false)}
              onError={() => {
                setWebLoading(false);
                setWebError(true);
              }}
              onHttpError={handleHttpError}
              startInLoadingState={false}
              javaScriptEnabled
              domStorageEnabled
              scalesPageToFit
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const STATUSBAR_HEIGHT =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0;

const styles = StyleSheet.create({
  // ── Image viewer header ──────────────────────────────────────────────────
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.015,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  imageCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeaderTitle: {
    flex: 1,
    marginLeft: sizes.screenWidth * 0.03,
    marginRight: sizes.screenWidth * 0.02,
  },
  headerFileName: {
    marginBottom: 2,
  },

  // ── Doc viewer ──────────────────────────────────────────────────────────
  docContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backButtonBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docHeaderInfo: {
    flex: 1,
    marginHorizontal: sizes.screenWidth * 0.03,
  },
  docHeaderFileName: {
    marginBottom: 2,
  },

  // ── Shared format badge ──────────────────────────────────────────────────
  formatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },

  // ── WebView area ─────────────────────────────────────────────────────────
  webviewContainer: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    zIndex: 10,
  },
  loadingText: {
    marginTop: sizes.screenHeight * 0.015,
  },

  // ── Error state ───────────────────────────────────────────────────────────
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.1,
  },
  errorTitle: {
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSub: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: sizes.screenHeight * 0.03,
  },
  retryBtn: {
    backgroundColor: colors.blueNormal,
    paddingHorizontal: sizes.screenWidth * 0.1,
    paddingVertical: sizes.screenHeight * 0.014,
    borderRadius: sizes.screenWidth * 0.06,
  },
});

export default CertificateViewer;
