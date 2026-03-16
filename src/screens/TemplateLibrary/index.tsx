import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Wrapper, AppText, AppHeader, AppScrollView } from '../../components';
import styles from './style';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

interface TemplateItem {
  id: string;
  title: string;
  type: string;
  size: string;
  updatedOn: string;
  updatedYear: string;
  badgeBG: string;
  badgeText: string;
}

interface CertificateItem {
  id: string;
  title: string;
  meta: string;
}

const templateItems: TemplateItem[] = [
  {
    id: '1',
    title: 'Commercial Property\nAssessment',
    type: 'Commercial',
    size: '3.1 MB',
    updatedOn: 'Updated Jan 10,',
    updatedYear: '2026',
    badgeBG: '#EEEAFE',
    badgeText: '#6C4DFF',
  },
  {
    id: '2',
    title: 'Land Valuation Template',
    type: 'Land',
    size: '1.8 MB',
    updatedOn: 'Updated Jan 8,',
    updatedYear: '2026',
    badgeBG: '#E4F9E8',
    badgeText: '#13A452',
  },
  {
    id: '3',
    title: 'Multi-Family Property\nReport',
    type: 'Residential',
    size: '2.7 MB',
    updatedOn: 'Updated Jan 5,',
    updatedYear: '2026',
    badgeBG: '#E5F0FF',
    badgeText: '#2A6DF4',
  },
  {
    id: '4',
    title: 'Industrial Property\nInspection',
    type: 'Commercial',
    size: '3.5 MB',
    updatedOn: 'Updated Dec 28,',
    updatedYear: '2025',
    badgeBG: '#EEEAFE',
    badgeText: '#6C4DFF',
  },
  {
    id: '5',
    title: 'Condominium\nAssessment',
    type: 'Residential',
    size: '2.1 MB',
    updatedOn: 'Updated Dec 20,',
    updatedYear: '2025',
    badgeBG: '#E5F0FF',
    badgeText: '#2A6DF4',
  },
];

const personalCertificates: CertificateItem[] = [
  {
    id: '1',
    title: 'Certified Residential',
    meta: 'Jan 15, 2026 • 1.2 MB',
  },
  {
    id: '2',
    title: 'State License -',
    meta: 'Jan 10, 2026 • 850 KB',
  },
];

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const TemplateLibrary = () => {
  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Template Library"
        // hideBackButton
        showSearchBar={true}
        containerStyle={headerContainerStyle}
      />
      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.templatesContainer}>
          {templateItems.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={styles.templateCard}
            >
              <View style={styles.fileIconWrap}>
                <Icon name="file-text" size={16} color={colors.blueNormal} />
              </View>

              <View style={styles.templateDetailWrap}>
                <AppText
                  fontSize={fontSize.medium}
                  fontFamily={fontFamily.Bold}
                  color={colors.textDark}
                  style={styles.templateTitle}
                >
                  {item.title}
                </AppText>

                <View style={styles.metaRow}>
                  <View
                    style={[styles.badge, { backgroundColor: item.badgeBG }]}
                  >
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Bold}
                      color={item.badgeText}
                    >
                      {item.type}
                    </AppText>
                  </View>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                    style={styles.fileSize}
                  >
                    {item.size}
                  </AppText>
                </View>

                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  {item.updatedOn}
                </AppText>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  {item.updatedYear}
                </AppText>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionIconWrap}
              >
                <Icon name="download" size={15} color={colors.blueNormal} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.offlineCard}>
          <View style={styles.offlineTitleRow}>
            <Icon name="download" size={13} color={colors.blueNormal} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.blueNormal}
              style={styles.offlineTitle}
            >
              Offline Access
            </AppText>
          </View>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
            style={styles.offlineDescription}
          >
            Downloaded templates are available offline
          </AppText>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
          >
            for your convenience.
          </AppText>
        </View>

        <View style={styles.certificateCard}>
          <AppText
            fontSize={fontSize.h6}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.personalTitle}
          >
            Personal Certificates
          </AppText>

          {personalCertificates.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.personalItem,
                index === personalCertificates.length - 1 &&
                  styles.personalItemSpacing,
              ]}
            >
              <View style={styles.personalIconWrap}>
                <Icon name="file-text" size={14} color={colors.blueNormal} />
              </View>

              <View style={styles.personalDetailWrap}>
                <AppText
                  fontSize={fontSize.medium}
                  fontFamily={fontFamily.Bold}
                  color={colors.textDark}
                  numberOfLines={1}
                >
                  {item.title}
                </AppText>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  {item.meta}
                </AppText>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.removeIconWrap}
              >
                <Icon name="x" size={14} color={colors.textLighter} />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.securityCard}>
            <Icon name="lock" size={15} color={colors.blueNormal} />
            <View style={styles.securityTextWrap}>
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                Private & Secure
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Your certificates are visible only to you
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                and administrators.
              </AppText>
            </View>
          </View>
        </View>
      </AppScrollView>
    </Wrapper>
  );
};

export default TemplateLibrary;
