import { useState, useEffect } from 'react';
import { NotificationModel, userApi, UserProfileModel } from '@/api/user.api';
import { PhotoIcon, UserCircleIcon, TrophyIcon, ShieldCheckIcon, UserGroupIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/outline';
import LoadingScreen from '@/components/LoadingScreen';

export default function Profile() {
  const [profile, setProfile] = useState<UserProfileModel>();
  const [notifications, setNotifications] = useState<NotificationModel[]>()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userApi.fetchProfile();
        setProfile(data);
        const notification = await userApi.fetchNotifications(data?.userId)
        setNotifications(notification);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-6">
          <div className="relative">
            {profile?.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
                <UserCircleIcon className="w-16 h-16 text-slate-400" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200">
              <PhotoIcon className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{profile?.name || 'User'}</h1>
            <p className="text-slate-400">{profile?.userEmailId}</p>
            <div className="flex items-center gap-2 mt-2">
              {profile?.isEmailVerified && (
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <TrophyIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Tournaments Won</p>
              <p className="text-2xl font-bold text-white">{profile?.tournamentsWon || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <UserGroupIcon className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Tournaments</p>
              <p className="text-2xl font-bold text-white">{profile?.totalTournaments || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <ChartBarIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Win Rate</p>
              <p className="text-2xl font-bold text-white">
                {profile?.winRate ? `${profile.winRate}%` : '0%'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <StarIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Rank</p>
              <p className="text-2xl font-bold text-white">{profile?.rank || 'Unranked'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={profile?.name || ''}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={profile?.userEmailId || ''}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
                {profile?.isEmailVerified ? (
                  <span className="px-3 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm flex items-center gap-1">
                    <ShieldCheckIcon className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <button className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-xl text-sm hover:bg-blue-500/30 transition-colors duration-200">
                    Verify
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
              <input
                type="text"
                value={profile?.name || ''}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors duration-200">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Change Password</h3>
                <p className="text-sm text-slate-400">Update your account password</p>
              </div>
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors duration-200">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Delete Account</h3>
                <p className="text-sm text-slate-400">Permanently delete your account</p>
              </div>
              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications?.map((notification: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">{notification.title}</p>
                <p className="text-sm text-slate-400">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 