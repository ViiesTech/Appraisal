import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ConvMessage {
  _id: string;
  senderId: string;
  text: string;
  attachments: string[];
  createdAt: string; // ISO string — serialisable for Redux
  isRead: boolean;
  isOptimistic?: boolean;
}

export interface ConversationData {
  _id: string;
  adminId: string;
  recipientName: string;
  recipientAvatar: string | null;
  adminOnline: boolean;
  adminLastSeen: string | null;
  messages: ConvMessage[]; // newest-first (FlatList inverted)
  totalPages: number;
  unreadCount: number;
}

interface ConversationState {
  conversation: ConversationData | null; // null = not yet initialised
  isLoading: boolean;
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
const initialState: ConversationState = {
  conversation: null,
  isLoading: false,
};

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------
const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    /** Stores full conversation from createConversation API response. */
    setConversation(state, action: PayloadAction<ConversationData>) {
      console.log('[Redux] setConversation — _id:', action.payload._id, '| messages:', action.payload.messages.length);
      state.conversation = action.payload;
      state.isLoading = false;
    },

    /** Silently replaces messages after getAllMessages API returns. */
    replaceMessages(
      state,
      action: PayloadAction<{ messages: ConvMessage[]; totalPages: number }>,
    ) {
      if (!state.conversation) return;
      console.log('[Redux] replaceMessages — count:', action.payload.messages.length, '| totalPages:', action.payload.totalPages);
      state.conversation.messages = action.payload.messages;
      state.conversation.totalPages = action.payload.totalPages;
    },

    /** Appends older messages at the end for pagination. */
    appendOlderMessages(state, action: PayloadAction<ConvMessage[]>) {
      if (!state.conversation) return;
      console.log('[Redux] appendOlderMessages — adding:', action.payload.length);
      state.conversation.messages = [...state.conversation.messages, ...action.payload];
    },

    /** Adds an incoming socket message at top. Deduplicates. */
    addMessage(state, action: PayloadAction<ConvMessage>) {
      if (!state.conversation) return;
      if (state.conversation.messages.some(m => m._id === action.payload._id)) return;
      console.log('[Redux] addMessage (socket) — id:', action.payload._id);
      state.conversation.messages.unshift(action.payload);
    },

    /** Instantly adds optimistic message while send API is in flight. */
    addOptimisticMessage(state, action: PayloadAction<ConvMessage>) {
      if (!state.conversation) return;
      console.log('[Redux] addOptimisticMessage — id:', action.payload._id);
      state.conversation.messages.unshift(action.payload);
    },

    /** Replaces the optimistic placeholder with the confirmed server message. */
    confirmMessage(
      state,
      action: PayloadAction<{ optimisticId: string; message: ConvMessage }>,
    ) {
      if (!state.conversation) return;
      console.log('[Redux] confirmMessage —', action.payload.optimisticId, '->', action.payload.message._id);
      const idx = state.conversation.messages.findIndex(m => m._id === action.payload.optimisticId);
      if (idx !== -1) state.conversation.messages[idx] = action.payload.message;
    },

    /** Removes a message — used to roll back a failed send. */
    removeMessage(state, action: PayloadAction<string>) {
      if (!state.conversation) return;
      console.log('[Redux] removeMessage (rollback) — id:', action.payload);
      state.conversation.messages = state.conversation.messages.filter(m => m._id !== action.payload);
    },

    /** Marks all messages as read when admin sees them. */
    markAllMessagesRead(state) {
      if (!state.conversation) return;
      console.log('[Redux] markAllMessagesRead');
      state.conversation.messages = state.conversation.messages.map(m => ({ ...m, isRead: true }));
      state.conversation.unreadCount = 0;
    },

    /** Updates admin online status from socket. */
    setAdminOnlineStatus(
      state,
      action: PayloadAction<{ isOnline: boolean; lastSeen: string | null }>,
    ) {
      if (!state.conversation) return;
      console.log('[Redux] setAdminOnlineStatus — isOnline:', action.payload.isOnline);
      state.conversation.adminOnline = action.payload.isOnline;
      state.conversation.adminLastSeen = action.payload.lastSeen ?? null;
    },

    setConvLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    /** Increments unread count when a new message arrives from admin. */
    incrementUnreadCount(state) {
      if (!state.conversation) return;
      state.conversation.unreadCount += 1;
    },

    /** Sets unread count directly from inbox socket event. */
    setUnreadCount(state, action: PayloadAction<number>) {
      if (!state.conversation) return;
      console.log('[Redux] setUnreadCount —', action.payload);
      state.conversation.unreadCount = action.payload;
    },

    /** Full reset on logout. */
    clearConversation() {
      return initialState;
    },
  },
});

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export const {
  setConversation,
  replaceMessages,
  appendOlderMessages,
  addMessage,
  addOptimisticMessage,
  confirmMessage,
  removeMessage,
  markAllMessagesRead,
  setAdminOnlineStatus,
  setConvLoading,
  incrementUnreadCount,
  setUnreadCount,
  clearConversation,
} = conversationSlice.actions;

// Selectors
export const selectConversation = (state: RootState) => state.conversation.conversation;
export const selectConvMessages = (state: RootState) => state.conversation.conversation?.messages ?? [];
export const selectConvIsLoading = (state: RootState) => state.conversation.isLoading;
export const selectUnreadCount = (state: RootState) => state.conversation.conversation?.unreadCount ?? 0;

export default conversationSlice.reducer;
