import { NotificationModel } from '@/api/user.api';

export interface NotificationsState {
  items: NotificationModel[];
  loading: boolean;
  error: string | null;
} 