import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { AppText, ShadowCard } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { pick, types } from '@react-native-documents/picker';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import styles from './style';

interface Certificate {
    id: string;
    name: string;
    date: string;
    size: string;
}

const HomeCertificates = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([
        {
            id: '1',
            name: 'Certified Residential',
            date: 'Jan 15, 2026',
            size: '1.2 MB',
        },
        {
            id: '2',
            name: 'State License - ',
            date: 'Jan 10, 2026',
            size: '850 KB',
        }
    ]);

    const handlePickFile = async () => {
        try {
            const [result] = await pick({
                type: [types.pdf, types.images],
                multiple: false,
            });

            if (result) {
                const newCert: Certificate = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: result.name || 'Unnamed File',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    size: result.size ? (result.size / (1024 * 1024)).toFixed(1) + ' MB' : 'Unknown',
                };

                setCertificates(prev => [newCert, ...prev]);
            }
        } catch (err) {
            // handle cancel or other errors
            console.log('File picker error:', err);
        }
    };

    const removeCertificate = (id: string) => {
        setCertificates(prev => prev.filter(item => item.id !== id));
    };

    const renderItem = ({ item, index }: { item: typeof certificates[0], index: number }) => (
        <View key={item.id} style={styles.certItem}>
            <View style={styles.certIconContainer}>
                <Icon name="file-text" size={22} color={colors.statusBlue} />
            </View>
            <View style={styles.certDetails}>
                <AppText fontSize={fontSize.medium} fontFamily={fontFamily.Bold} color={colors.textDark} style={styles.certName} numberOfLines={1}>{item.name}</AppText>
                <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter} style={styles.certMeta}>{item.date} • {item.size}</AppText>
            </View>
            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeCertificate(item.id)}
            >
                <Icon name="x" size={20} color={colors.textLighter} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <ShadowCard style={styles.mainCard}>
                <View style={styles.headerRow}>
                    <Icon name="lock" size={fontSize.h6} color={colors.certLockIcon} style={{ marginRight: sizes.screenWidth * 0.02 }} />
                    <AppText fontSize={fontSize.h6} fontFamily={fontFamily.Bold}
                        color={colors.textDark} style={styles.uploadTitle}>Personal Certificates</AppText>
                </View>

                <View style={styles.uploadContainer}>
                    <View style={styles.uploadIconCircle}>
                        <Icon name="upload" size={24} color={colors.statusBlue} />
                    </View>
                    <AppText fontSize={fontSize.medium} fontFamily={fontFamily.Bold}
                        color={colors.textDark} style={styles.uploadTitle}>Upload Certificate</AppText>
                    <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Regular}
                        color={colors.textLighter} style={styles.uploadSubtitle}>PDF, JPG or PNG • Max 10MB</AppText>

                    <TouchableOpacity
                        style={styles.chooseFileBtn}
                        activeOpacity={0.8}
                        onPress={handlePickFile}
                    >
                        <AppText fontSize={fontSize.medium} fontFamily={fontFamily.Bold} color={colors.white}>Choose File</AppText>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Icon name="lock" size={20} color={colors.statusBlue} />
                    <View style={styles.infoTextContainer}>
                        <AppText fontSize={fontSize.medium} fontFamily={fontFamily.Bold} color={colors.textDark} style={styles.infoTitle}>Private & Secure</AppText>
                        <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter} style={styles.infoDesc}>
                            Your certificates are visible only to you and administrators.
                        </AppText>
                    </View>
                </View>
            </ShadowCard>
            <ShadowCard style={{
                padding: sizes.screenWidth * 0.05,
                marginTop: sizes.screenHeight * 0.02,
            }}>
                <AppText fontSize={fontSize.h6} fontFamily={fontFamily.Bold} color={colors.textDark}
                    style={styles.listHeader}>My Certificates ({certificates.length})</AppText>
                <FlatList
                    data={certificates}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    style={[styles.flatList]}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <AppText
                                fontFamily={fontFamily.Bold}
                                color={colors.textLighter}
                            >
                                No certificates found
                            </AppText>
                        </View>
                    }
                />
            </ShadowCard>

        </View>
    );
};

export default HomeCertificates;


