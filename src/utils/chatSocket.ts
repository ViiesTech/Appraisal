import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../redux/constant';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string | Date;
  isRead?: boolean;
}

export interface Conversation {
  _id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  updatedAt?: string | Date;
}

export type SocketStatus =
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
  | 'error';

// ---------------------------------------------------------------------------
// Socket instance (module-level singleton)
// ---------------------------------------------------------------------------

let socket: Socket | null = null;

// ---------------------------------------------------------------------------
// Socket Events (centralised so call-sites never use raw strings)
// ---------------------------------------------------------------------------

export const CHAT_EVENTS = {
  // Emitted by client
  JOIN_CONVERSATION: 'joinConversation',
  LEAVE_CONVERSATION: 'leaveConversation',
  SEND_MESSAGE: 'sendMessage',
  TYPING_START: 'typingStart',
  TYPING_STOP: 'typingStop',
  EMIT_TYPING: 'typing',
  EMIT_STOP_TYPING: 'stop_typing',
  MARK_READ: 'markRead',

  // Emitted by server
  NEW_MESSAGE: 'new_message',
  MESSAGE_DELIVERED: 'messageDelivered',
  MESSAGE_READ: 'messageRead',
  MESSAGES_SEEN: 'messages_seen',
  TYPING: 'display_typing',
  STOP_TYPING: 'hide_typing',
  ONLINE_STATUS: 'user_status',
  INBOX: 'inbox',
  ERROR: 'chatError',
} as const;

// ---------------------------------------------------------------------------
// Connect
// ---------------------------------------------------------------------------

/**
 * Initialises and connects the socket.
 * Safe to call multiple times — returns the existing socket if already connected.
 *
 * @param authToken  Bearer token stored in Redux auth state
 */
export function connectSocket(authToken: string): Socket {
  if (socket && socket.connected) {
    return socket;
  }

  // Disconnect any stale socket before creating a new one
  if (socket) {
    socket.disconnect();
  }

  socket = io(BASE_URL, {
    transports: ['websocket'],
    auth: { token: authToken },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    timeout: 10000,
  });

  // Built-in lifecycle listeners (logging / debugging)
  socket.on('connect', () => {
    console.log('[Socket] Connected — id:', socket?.id);
  });

  socket.on('disconnect', reason => {
    console.log('[Socket] Disconnected —', reason);
  });

  socket.on('connect_error', err => {
    console.warn('[Socket] Connection error —', err.message);
  });

  socket.on('reconnect_attempt', attempt => {
    console.log('[Socket] Reconnect attempt #', attempt);
  });

  socket.on('reconnect', () => {
    console.log('[Socket] Reconnected');
  });

  return socket;
}

// ---------------------------------------------------------------------------
// Disconnect
// ---------------------------------------------------------------------------

/** Cleanly disconnects the socket and nullifies the singleton. */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('[Socket] Manually disconnected');
  }
}

// ---------------------------------------------------------------------------
// Accessor
// ---------------------------------------------------------------------------

/** Returns the current socket instance, or null if not yet connected. */
export function getSocket(): Socket | null {
  return socket;
}

/** Returns true if the socket exists and is currently connected. */
export function isSocketConnected(): boolean {
  return socket?.connected ?? false;
}

// ---------------------------------------------------------------------------
// Room helpers
// ---------------------------------------------------------------------------

/** Join a specific conversation room. */
export function joinConversation(conversationId: string): void {
  console.log('[Socket] Emit — joinConversation:', { conversationId });
  socket?.emit(CHAT_EVENTS.JOIN_CONVERSATION, { conversationId });
}

/** Leave a specific conversation room. */
export function leaveConversation(conversationId: string): void {
  console.log('[Socket] Emit — leaveConversation:', { conversationId });
  socket?.emit(CHAT_EVENTS.LEAVE_CONVERSATION, { conversationId });
}

// ---------------------------------------------------------------------------
// Messaging
// ---------------------------------------------------------------------------

/**
 * Sends a chat message.
 *
 * @param conversationId  Target conversation
 * @param senderId        Logged-in user's ID
 * @param text            Message text
 */
export function sendMessage(
  conversationId: string,
  senderId: string,
  text: string,
): void {
  console.log('[Socket] Emit — sendMessage:', {
    conversationId,
    senderId,
    text,
  });
  socket?.emit(CHAT_EVENTS.SEND_MESSAGE, { conversationId, senderId, text });
}

/** Notify the server that the user has read messages in a conversation. */
export function markMessagesRead(conversationId: string, userId: string): void {
  console.log('[Socket] Emit — markRead:', { conversationId, userId });
  socket?.emit(CHAT_EVENTS.MARK_READ, { conversationId, userId });
}

// ---------------------------------------------------------------------------
// Typing indicators
// ---------------------------------------------------------------------------

export function emitTypingStart(conversationId: string, userId: string): void {
  console.log('[Socket] Emit — typingStart:', { conversationId, userId });
  socket?.emit(CHAT_EVENTS.TYPING_START, { conversationId, userId });
}

export function emitTypingStop(conversationId: string, userId: string): void {
  console.log('[Socket] Emit — typingStop:', { conversationId, userId });
  socket?.emit(CHAT_EVENTS.TYPING_STOP, { conversationId, userId });
}

/** Notifies the recipient that the current user is typing. */
export function emitTyping(conversationId: string, recipientId: string): void {
  console.log('[Socket] Emit — typing:', { conversationId, recipientId });
  socket?.emit(CHAT_EVENTS.EMIT_TYPING, { conversationId, recipientId });
}

/** Notifies the recipient that the current user stopped typing. */
export function emitStopTyping(conversationId: string, recipientId: string): void {
  console.log('[Socket] Emit — stop_typing:', { conversationId, recipientId });
  socket?.emit(CHAT_EVENTS.EMIT_STOP_TYPING, { conversationId, recipientId });
}

// ---------------------------------------------------------------------------
// Listeners  (each returns an unsubscribe function for use in useEffect)
// ---------------------------------------------------------------------------

/** Called when a new message arrives in any joined conversation. */
export function onNewMessage(callback: (message: any) => void): () => void {
  console.log('[Socket] Listener registered — new_message');
  const wrapped = (payload: any) => {
    console.log('[Socket] Event received — new_message:', payload);
    // server wraps the message inside a "message" key
    const message = payload?.message ?? payload;
    callback(message);
  };
  socket?.on(CHAT_EVENTS.NEW_MESSAGE, wrapped);
  return () => {
    console.log('[Socket] Listener removed — new_message');
    socket?.off(CHAT_EVENTS.NEW_MESSAGE, wrapped);
  };
}

/** Called when the server confirms message delivery. */
export function onMessageDelivered(
  callback: (message: ChatMessage) => void,
): () => void {
  console.log('[Socket] Listener registered — messageDelivered');
  const wrapped = (message: ChatMessage) => {
    console.log('[Socket] Event received — messageDelivered:', message);
    callback(message);
  };
  socket?.on(CHAT_EVENTS.MESSAGE_DELIVERED, wrapped);
  return () => {
    console.log('[Socket] Listener removed — messageDelivered');
    socket?.off(CHAT_EVENTS.MESSAGE_DELIVERED, wrapped);
  };
}

/** Called when a message is marked as read by the recipient. */
export function onMessageRead(
  callback: (data: { conversationId: string; userId: string }) => void,
): () => void {
  console.log('[Socket] Listener registered — messageRead');
  const wrapped = (data: { conversationId: string; userId: string }) => {
    console.log('[Socket] Event received — messageRead:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.MESSAGE_READ, wrapped);
  return () => {
    console.log('[Socket] Listener removed — messageRead');
    socket?.off(CHAT_EVENTS.MESSAGE_READ, wrapped);
  };
}

/** Called when the admin has seen all messages in a conversation. */
export function onMessagesSeen(
  callback: (data: {
    conversationId: string;
    seenBy: string;
    readAt: string;
  }) => void,
): () => void {
  console.log('[Socket] Listener registered — messages_seen');
  const wrapped = (data: {
    conversationId: string;
    seenBy: string;
    readAt: string;
  }) => {
    console.log('[Socket] Event received — messages_seen:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.MESSAGES_SEEN, wrapped);
  return () => {
    console.log('[Socket] Listener removed — messages_seen');
    socket?.off(CHAT_EVENTS.MESSAGES_SEEN, wrapped);
  };
}

/** Called when the other participant starts typing. */
export function onTyping(
  callback: (data: { conversationId: string; senderId: string }) => void,
): () => void {
  console.log('[Socket] Listener registered — display_typing');
  const wrapped = (data: { conversationId: string; senderId: string }) => {
    console.log('[Socket] Event received — display_typing:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.TYPING, wrapped);
  return () => {
    console.log('[Socket] Listener removed — display_typing');
    socket?.off(CHAT_EVENTS.TYPING, wrapped);
  };
}

/** Called when the other participant stops typing. */
export function onStopTyping(
  callback: (data: { conversationId: string; senderId: string }) => void,
): () => void {
  console.log('[Socket] Listener registered — hide_typing');
  const wrapped = (data: { conversationId: string; senderId: string }) => {
    console.log('[Socket] Event received — hide_typing:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.STOP_TYPING, wrapped);
  return () => {
    console.log('[Socket] Listener removed — hide_typing');
    socket?.off(CHAT_EVENTS.STOP_TYPING, wrapped);
  };
}

/** Called when a participant's online/offline status changes. */
export function onOnlineStatus(
  callback: (data: {
    userId: string;
    isOnline: boolean;
    lastSeen: string | null;
  }) => void,
): () => void {
  console.log('[Socket] Listener registered — user_status');
  const wrapped = (data: {
    userId: string;
    isOnline: boolean;
    lastSeen: string | null;
  }) => {
    console.log('[Socket] Event received — user_status:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.ONLINE_STATUS, wrapped);
  return () => {
    console.log('[Socket] Listener removed — user_status');
    socket?.off(CHAT_EVENTS.ONLINE_STATUS, wrapped);
  };
}

/** Called when the inbox event fires — carries updated unreadCount per user. */
export function onInbox(callback: (data: any) => void): () => void {
  console.log('[Socket] Listener registered — inbox');
  const wrapped = (data: any) => {
    console.log('[Socket] Event received — inbox:', data);
    callback(data);
  };
  socket?.on(CHAT_EVENTS.INBOX, wrapped);
  return () => {
    console.log('[Socket] Listener removed — inbox');
    socket?.off(CHAT_EVENTS.INBOX, wrapped);
  };
}

/** Called when the server emits a chat-specific error. */
export function onChatError(
  callback: (error: { message: string }) => void,
): () => void {
  console.log('[Socket] Listener registered — chatError');
  const wrapped = (error: { message: string }) => {
    console.warn('[Socket] Event received — chatError:', error);
    callback(error);
  };
  socket?.on(CHAT_EVENTS.ERROR, wrapped);
  return () => {
    console.log('[Socket] Listener removed — chatError');
    socket?.off(CHAT_EVENTS.ERROR, wrapped);
  };
}

/** Listen for socket connection status changes. */
export function onSocketStatusChange(
  callback: (status: SocketStatus) => void,
): () => void {
  console.log('[Socket] Listener registered — socketStatusChange');
  const onConnect = () => {
    console.log('[Socket] Status changed — connected');
    callback('connected');
  };
  const onDisconnect = () => {
    console.log('[Socket] Status changed — disconnected');
    callback('disconnected');
  };
  const onReconnecting = () => {
    console.log('[Socket] Status changed — reconnecting');
    callback('reconnecting');
  };
  const onError = () => {
    console.log('[Socket] Status changed — error');
    callback('error');
  };

  socket?.on('connect', onConnect);
  socket?.on('disconnect', onDisconnect);
  socket?.on('reconnect_attempt', onReconnecting);
  socket?.on('connect_error', onError);

  return () => {
    socket?.off('connect', onConnect);
    socket?.off('disconnect', onDisconnect);
    socket?.off('reconnect_attempt', onReconnecting);
    socket?.off('connect_error', onError);
  };
}

// ---------------------------------------------------------------------------
// Remove all listeners for a specific event (cleanup utility)
// ---------------------------------------------------------------------------

export function removeAllListeners(event?: string): void {
  if (event) {
    socket?.removeAllListeners(event);
  } else {
    socket?.removeAllListeners();
  }
}
