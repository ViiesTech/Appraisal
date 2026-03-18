import { StyleSheet, View } from 'react-native';
import ShadowCard from '../ShadowCard';
import images from '../../services/utilities/images';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import AppText from '../AppText';
import Icon from 'react-native-vector-icons/Feather';

type StatItem = {
  id: number | string;
  title: string;
  value: string;
  icon: string;
};

interface StatsCardsProps {
  data?: StatItem[];
  variant?: 'home' | 'profile';
}

const StatsCards = ({ data, variant = 'home' }: StatsCardsProps) => {
  const defaultStats: StatItem[] = [
    {
      title: 'Total Assigned',
      value: '24',
      icon: 'file-text',
      id: 1,
    },
    {
      title: "Today's Tasks",
      value: '8',
      icon: 'clock',
      id: 2,
    },
    {
      title: 'Completed',
      value: '16',
      icon: 'award',
      id: 3,
    },
    {
      title: 'Success Rate',
      value: '98%',
      icon: 'trending-up',
      id: 4,
    },
  ];

  const stats = data || defaultStats;

  const isProfileVariant = variant === 'profile';

  return (
    <View style={styles.grid}>
      {stats.map(item => (
        <ShadowCard
          key={item.id}
          imageSource={isProfileVariant ? undefined : images.progressCardBG}
          style={[styles.card, isProfileVariant && styles.profileCard]}
          imageStyle={[styles.cardBG, isProfileVariant && styles.profileCardBG]}
        >
          <View
            style={[
              styles.cardContent,
              isProfileVariant && styles.profileCardContent,
            ]}
          >
            <View
              style={[
                styles.headerRow,
                isProfileVariant && styles.profileHeaderRow,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  isProfileVariant && styles.profileIconContainer,
                ]}
              >
                <Icon
                  name={item.icon}
                  size={isProfileVariant ? 14 : fontSize.h5}
                  color={colors.white}
                />
              </View>
              <AppText
                fontSize={isProfileVariant ? fontSize.h5 : fontSize.h4}
                fontFamily={fontFamily.Black}
                color={colors.textDark}
                style={styles.valueText}
              >
                {item.value}
              </AppText>
            </View>
            <AppText
              fontSize={isProfileVariant ? fontSize.small : fontSize.smallM}
              fontFamily={fontFamily.Medium}
              color={colors.textLighter}
              style={styles.titleText}
            >
              {item.title}
            </AppText>
          </View>
        </ShadowCard>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: sizes.screenWidth * 0.43,
    marginBottom: sizes.screenWidth * 0.04,
    borderRadius: sizes.screenWidth * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  profileCard: {
    borderRadius: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#E7EAF1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBG: {
    borderRadius: sizes.screenWidth * 0.04,
  },
  profileCardBG: {
    borderRadius: sizes.screenWidth * 0.03,
  },
  cardContent: {
    flex: 1,
    padding: sizes.screenWidth * 0.03,
    justifyContent: 'center',
  },
  profileCardContent: {
    paddingVertical: sizes.screenHeight * 0.012,
    paddingHorizontal: sizes.screenWidth * 0.028,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.02,
  },
  profileHeaderRow: {
    marginBottom: sizes.screenHeight * 0.01,
  },
  iconContainer: {
    width: fontSize.h1,
    height: fontSize.h1,
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.blueNormal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: sizes.screenWidth * 0.085,
    height: sizes.screenWidth * 0.085,
    borderRadius: sizes.screenWidth * 0.022,
  },
  valueText: {},
  titleText: {},
});

export default StatsCards;
