export type UserRole = 'admin' | 'moderator' | 'player';

export interface Stream {
  id: string;
  playerName: string;
  isActive: boolean;
  quality: 'HD' | 'SD';
  viewers: number;
  startTime: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  type: 'suggestion' | 'alert' | 'message';
  status: 'pending' | 'approved' | 'rejected';
} 