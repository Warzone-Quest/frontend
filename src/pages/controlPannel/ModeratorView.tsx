import { useState } from 'react';
import { useWebRTC } from '@/webrtc/useWebRTC';
import { StreamView } from './components/StreamView';
import { ChatBox } from './components/ChatBox';
import { ArrowsPointingOutIcon, UserIcon, ClockIcon, SignalIcon } from '@heroicons/react/24/outline';

export const ModeratorView = () => {
  const [targetUserId, setTargetUserId] = useState('');

  const { state, createOffer } = useWebRTC({
    role: 'moderator',
    userId: 'mod1',
    signalingServerUrl: '/api/signaling',
    mediaConstraints: {
      video: true,
      audio: true
    }
  });

  const handleConnect = async () => {
    if (targetUserId) {
      await createOffer(targetUserId, 'player');
    }
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  return (
    <div className="h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-white/10 bg-indigo-950/30">
        <h1 className="text-xl font-semibold text-white">Moderator Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 text-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Active
          </span>
          <span className="text-white/60 text-sm">Monitoring: 4 Streams</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-12 gap-5 p-5">
        {/* Main Content */}
        <div className="col-span-8 flex flex-col gap-5">
          {/* Main Stream */}
          <div className="flex-1 bg-indigo-950/30 rounded-lg overflow-hidden">
            <div className="h-8 px-4 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <span className="text-white/80 text-sm font-medium">Primary Stream</span>
                <span className="text-emerald-400 text-xs px-2 py-0.5 rounded-full bg-emerald-400/10">Live</span>
              </div>
              <button className="text-white/60 hover:text-white">
                <ArrowsPointingOutIcon className="w-5 h-5" />
              </button>
            </div>
            <StreamView className="w-full h-[calc(100%-2rem)]" />
          </div>

          {/* Stream Info */}
          <div className="bg-indigo-950/30 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-white/80">
                <UserIcon className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-white/60">Streamer</div>
                  <div className="text-sm font-medium">Player123</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <ClockIcon className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-white/60">Duration</div>
                  <div className="text-sm font-medium">2h 15m</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <SignalIcon className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-white/60">Stream Quality</div>
                  <div className="text-sm font-medium">1080p 60fps</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-emerald-400 rounded-full"></div>
                </div>
                <span className="text-emerald-400 text-sm">98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-5">
          {/* Secondary Streams */}
          <div className="flex-1 bg-indigo-950/30 rounded-lg overflow-hidden">
            <div className="h-8 px-4 flex items-center justify-between bg-black/20">
              <span className="text-white/80 text-sm font-medium">Active Streams</span>
              <span className="text-white/60 text-sm">4 Monitored</span>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 h-[calc(100%-2rem)]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative group">
                  <StreamView className="w-full h-full rounded" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm">
                      Switch
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-xs">
                    <span className="text-white bg-black/50 px-1.5 py-0.5 rounded">Player{i}</span>
                    <span className="text-emerald-400 bg-black/50 px-1.5 py-0.5 rounded">Live</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="h-[300px] bg-indigo-950/30 rounded-lg overflow-hidden">
            <div className="h-8 px-4 flex items-center justify-between bg-black/20">
              <span className="text-white/80 text-sm font-medium">Admin Communication</span>
              <span className="text-emerald-400 text-sm">Admin Online</span>
            </div>
            <div className="p-4 h-[calc(100%-2rem)]">
              <ChatBox onSendMessage={handleSendMessage} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Connect to Player</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="Player ID"
                className="flex-1 px-3 py-2 bg-gray-700 rounded"
              />
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 