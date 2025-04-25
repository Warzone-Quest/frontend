import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loading } from '@/components/ui/Loading';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import { ModeratorDashboardStats, Stream, Message, TournamentStats } from './types';
import {
  ChartBarIcon,
  UserGroupIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  VideoCameraIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

export default function ModeratorView() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ModeratorDashboardStats | null>(null);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tournaments, setTournaments] = useState<TournamentStats[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // TODO: Replace with actual API calls
        // const response = await fetch('/api/moderator/stats');
        // const data = await response.json();
        // setStats(data.stats);
        // setStreams(data.streams);
        // setMessages(data.messages);
        // setTournaments(data.tournaments);

        // Temporary mock data
        setStats({
          assignedTournaments: 8,
          activeTournaments: 5,
          pendingReports: 12,
          resolvedReports: 45,
          activeStreams: 15,
          totalMessages: 120,
          unreadMessages: 8,
        });

        setStreams([
          {
            id: '1',
            playerName: 'Player1',
            userId: 'user1',
            tournamentId: 'tournament1',
            isActive: true,
            quality: 'HD',
            viewers: 1200,
            startTime: new Date().toISOString(),
            streamUrl: 'https://stream.example.com/1',
            status: 'live',
          },
        ]);

        setMessages([
          {
            id: '1',
            from: 'User1',
            to: 'Moderator',
            content: 'Report: Inappropriate behavior in tournament',
            timestamp: new Date().toISOString(),
            type: 'report',
            status: 'pending',
            priority: 'high',
            category: 'Behavior',
          },
        ]);

        setTournaments([
          {
            tournamentId: 'tournament1',
            tournamentName: 'Spring Championship',
            totalParticipants: 32,
            activeParticipants: 28,
            matchesCompleted: 15,
            totalMatches: 31,
            averageViewers: 1200,
            peakViewers: 2500,
            startTime: new Date().toISOString(),
            status: 'in-progress',
          },
        ]);
      } catch (err) {
        setError('Failed to load moderator dashboard data');
        addToast('Failed to load moderator dashboard data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch, addToast]);

  if (isLoading) {
    return <Loading variant="fullscreen" text="Loading moderator dashboard..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrophyIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Active Tournaments</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-white">{stats.activeTournaments}</p>
                  <span className="text-sm text-slate-400">/{stats.assignedTournaments}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Pending Reports</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-white">{stats.pendingReports}</p>
                  <span className="text-sm text-slate-400">/{stats.resolvedReports + stats.pendingReports}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <VideoCameraIcon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Active Streams</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-white">{stats.activeStreams}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <ChatBubbleLeftIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Unread Messages</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-white">{stats.unreadMessages}</p>
                  <span className="text-sm text-slate-400">/{stats.totalMessages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Streams */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Active Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map((stream) => (
              <div key={stream.id} className="bg-slate-700/30 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <VideoCameraIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{stream.playerName}</p>
                    <p className="text-sm text-slate-400">{stream.viewers} viewers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Recent Reports</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{message.content}</p>
                  <p className="text-sm text-slate-400">
                    From: {message.from} • {new Date(message.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Tournaments */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Assigned Tournaments</h2>
          <div className="space-y-4">
            {tournaments.map((tournament) => (
              <div key={tournament.tournamentId} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{tournament.tournamentName}</p>
                    <span className="text-sm text-slate-400">
                      {tournament.activeParticipants}/{tournament.totalParticipants} Participants
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(tournament.matchesCompleted / tournament.totalMatches) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 