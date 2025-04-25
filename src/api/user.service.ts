import axios from 'axios';
import { API_BASE_URL } from '@/config';

export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  profilePicture?: string;
  banner?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
}

export interface UpdateProfileImage {
  profilePicture?: string;
  profileBanner?: string;
}

export interface Notification {
  notificationId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

class UserService {
  private baseUrl = `${API_BASE_URL}/users`;

  async getProfile(userId: string): Promise<UserProfile> {
    const response = await axios.get(`${this.baseUrl}/${userId}`);
    return response.data;
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await axios.put(`${this.baseUrl}/${userId}`, data);
    return response.data;
  }

  async updateProfilePicture(userId: string, file: File): Promise<UserProfile> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.put(`${this.baseUrl}/${userId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateBanner(userId: string, file: File): Promise<UserProfile> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.put(`${this.baseUrl}/${userId}/banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    const response = await axios.get(`${this.baseUrl}/${userId}/notifications`);
    return response.data;
  }

  async markNotificationAsRead(userId: string, notificationId: string): Promise<void> {
    await axios.put(`${this.baseUrl}/${userId}/notifications/${notificationId}/read`);
  }

  async followUser(userId: string, targetUserId: string): Promise<void> {
    await axios.post(`${this.baseUrl}/${userId}/follow/${targetUserId}`);
  }

  async unfollowUser(userId: string, targetUserId: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${userId}/follow/${targetUserId}`);
  }

  async getFollowers(userId: string): Promise<UserProfile[]> {
    const response = await axios.get(`${this.baseUrl}/${userId}/followers`);
    return response.data;
  }

  async getFollowing(userId: string): Promise<UserProfile[]> {
    const response = await axios.get(`${this.baseUrl}/${userId}/following`);
    return response.data;
  }
}

export const userService = new UserService(); 