import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '@/store';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchNotifications } from '@/store/slices/notificationsSlice';

export function DashboardHeader() {
  const user = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notifications.items);
  const dispatch = useDispatch<AppDispatch>();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user.profile?.userId) {
      dispatch(fetchNotifications(user.profile.userId));
    }
  }, [dispatch, user.profile?.userId]);

  return (
    <header className="fixed top-4 left-[calc(280px+1rem)] right-4 h-16 z-10">
      <div className="h-full bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700/50">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-semibold text-white">Tournaments</h1>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-72 pl-10 pr-4 py-2 bg-slate-700/50 backdrop-blur border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-200 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Link to={"/dashboard/settings"}>
              <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors">
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
            </Link>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors relative"
              >
                <BellIcon className="w-6 h-6" />
                {/* <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-800"></span> */}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-700/50 py-2">
                  <div className="px-4 py-2 border-b border-slate-700/50">
                    <h3 className="text-white font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-slate-700/50 transition-colors">
                          <p className="text-white text-sm font-medium">{notification.title}</p>
                          <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-slate-400 text-xs mt-1">{notification.createdAt}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center">
                        <p className="text-slate-400 text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link to={"/dashboard/profile"}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                <UserCircleIcon className="w-8 h-8" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 