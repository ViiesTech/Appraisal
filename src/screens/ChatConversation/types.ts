// ---------------------------------------------------------------------------
// ChatConversation — shared types
// ---------------------------------------------------------------------------

export interface RawMessage {
  _id: string;
  conversationId: string;
  senderId: string | { _id: string };
  senderModel: string;
  content: string;
  attachments: string[];
  isRead: boolean;
  createdAt: string;
}

export interface RouteParams {
  convId: string;
  initialMessages: RawMessage[];
  name?: string;
  avatar?: string | null;
}

export interface LocalMessage {
  _id: string;
  senderId: string;
  text: string;
  attachments?: string[];
  createdAt: Date;
  isRead: boolean;
  isOptimistic?: boolean;
}

export interface PendingAttachment {
  uri: string;
  name: string;
  type: string;
}
