import { colors } from './colors';

export const STATUS_STEPS = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'underReview', label: 'Under Review' },
  { key: 'completed', label: 'Completed' },
  { key: 'finalReportInProgress', label: 'Final Report In Progress' },
  { key: 'overdue', label: 'Overdue' },
];

export const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'assigned':
      return { label: 'Assigned', color: colors.statusBlue, bg: '#EFF6FF' };
    case 'scheduled':
      return { label: 'Scheduled', color: colors.statusAmber, bg: '#FFFBEB' };
    case 'finalReportInProgress':
      return {
        label: 'Final Report In Progress',
        color: colors.statusBlue,
        bg: '#EFF6FF',
      };
    case 'completed':
      return { label: 'Completed', color: '#16A34A', bg: '#F0FDF4' };
    case 'overdue':
      return { label: 'Overdue', color: colors.priorityRedText, bg: '#FEE2E2' };
    case 'underreview':
      return {
        label: 'Under Review',
        color: colors.statusAmber,
        bg: '#FFFBEB',
      };
    default:
      return {
        label: status ?? '—',
        color: colors.statusGray,
        bg: colors.AppBG,
      };
  }
};
