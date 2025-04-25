export interface Notification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum NotificationType {
  FOLLOW = 'FOLLOW',
  TOURNAMENT_REGISTRATION = 'TOURNAMENT_REGISTRATION',
  TOURNAMENT_START = 'TOURNAMENT_START',
  TOURNAMENT_END = 'TOURNAMENT_END',
  MATCH_START = 'MATCH_START',
  MATCH_END = 'MATCH_END',
} 