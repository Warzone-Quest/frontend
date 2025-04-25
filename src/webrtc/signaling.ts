import { SignalingClient, SignalingMessage } from '@/webrtc/types';

export class PollingSignalingClient implements SignalingClient {
  private pollingInterval: NodeJS.Timeout | null = null;
  private messageCallbacks: ((message: SignalingMessage) => void)[] = [];
  private lastMessageId: string | null = null;

  constructor(
    private url: string,
    private pollingIntervalMs: number = 1000
  ) {}

  async connect(): Promise<void> {
    try {
      // Start polling for messages
      this.startPolling();
      console.log('Connected to signaling server via polling');
    } catch (error) {
      console.error('Error connecting to signaling server:', error);
      throw error;
    }
  }

  disconnect(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  private startPolling(): void {
    this.pollingInterval = setInterval(async () => {
      try {
        const response = await fetch(`${this.url}/messages?lastId=${this.lastMessageId || ''}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const messages = await response.json() as SignalingMessage[];
        
        if (messages.length > 0) {
          this.lastMessageId = messages[messages.length - 1].id;
          messages.forEach(message => {
            this.messageCallbacks.forEach(callback => callback(message));
          });
        }
      } catch (error) {
        console.error('Error polling for messages:', error);
      }
    }, this.pollingIntervalMs);
  }

  async sendMessage(message: SignalingMessage): Promise<void> {
    try {
      const response = await fetch(`${this.url}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  onMessage(callback: (message: SignalingMessage) => void): void {
    this.messageCallbacks.push(callback);
  }
} 