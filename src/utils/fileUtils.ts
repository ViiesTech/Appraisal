import { PermissionsAndroid, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { showToast } from './toast';
import { FileItem } from '../types';

export const getFilename = (url: string): string => {
  try {
    const parts = decodeURIComponent(url).split('/');
    const last = parts[parts.length - 1];
    return last.split('?')[0] || 'File';
  } catch {
    return 'File';
  }
};

export const getFileExtension = (url: string): string => {
  const cleanName = getFilename(url);
  const ext = cleanName.split('.').pop()?.toLowerCase();
  return ext && ext.length <= 5 ? ext : 'jpg';
};

export const requestGalleryPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  // For Android 13+ (API 33+)
  if (Platform.Version >= 33) {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    return hasPermission === PermissionsAndroid.RESULTS.GRANTED;
  }

  // For Android 10-12 (API 29-32)
  if (Number(Platform.Version) >= 29) {
    const hasReadPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    return hasReadPermission === PermissionsAndroid.RESULTS.GRANTED;
  }

  // For Android 9 and below (API <= 28)
  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  return (
    permissions[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    permissions[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
      PermissionsAndroid.RESULTS.GRANTED
  );
};

export const downloadDocument = async (url: string, filename: string) => {
  try {
    showToast('info', 'Downloading...', filename);

    if (Platform.OS === 'ios') {
      // iOS: download to Documents dir then open with share sheet
      const destPath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${filename}`;
      const response = await ReactNativeBlobUtil.config({
        path: destPath,
        fileCache: true,
      }).fetch('GET', url);
      const localPath = response.path();
      await ReactNativeBlobUtil.ios.openDocument(localPath);
    } else {
      // Android: download to Downloads folder and show notification
      const response = await ReactNativeBlobUtil.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: filename,
          description: 'Downloading file...',
          mime: 'application/octet-stream',
          mediaScannable: true,
          path: `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${filename}`,
        },
      }).fetch('GET', url);
      response.path();
      showToast('success', 'Download complete', filename);
    }
  } catch (error) {
    console.error('Download error:', error);
    showToast('error', 'Download failed', 'Please try again');
  }
};

export const saveImageToGallery = async (file: FileItem) => {
  const hasPermission = await requestGalleryPermission();

  if (!hasPermission) {
    showToast('error', 'Photo permission is required');
    return;
  }

  const extension = getFileExtension(file.url);
  const downloadPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${Date.now()}.${extension}`;

  try {
    const response = await ReactNativeBlobUtil.config({
      path: downloadPath,
      fileCache: true,
    }).fetch('GET', file.url);
    const localPath = response.path();
    const cameraRollPath = Platform.OS === 'ios' ? `file://${localPath}` : localPath;

    await CameraRoll.save(cameraRollPath, { type: 'photo' });
    showToast('success', 'Image saved to gallery');

    ReactNativeBlobUtil.fs.unlink(localPath).catch(() => undefined);
  } catch (error) {
    console.error('Save image error:', error);
    showToast('error', 'Could not save image');
  }
};
