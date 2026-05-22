import { LocalMessage, RawMessage } from './types';

export const normalizeRaw = (m: RawMessage): LocalMessage => ({
  _id: m._id,
  senderId: typeof m.senderId === 'string' ? m.senderId : (m.senderId as any)?._id ?? '',
  text: m.content ?? '',
  attachments: m.attachments ?? [],
  createdAt: new Date(m.createdAt),
  isRead: m.isRead ?? false,
});
