import { useEffect, useState } from 'react';
import { TrophyIcon, UserGroupIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { TournamentCard } from "@/pages/dashboard/tournamentCard";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTournaments } from '@/store/slices/tournamentSlice';
import { Loading } from '@/components/ui/Loading';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import { Tournament, TournamentStatus } from '@/types/tournament';
import { useNavigate } from 'react-router-dom';

interface Stat {
  name: string;
  value: string;
  progress: boolean;
  icon: any;
  trend: 'up' | 'down';
}

const mapTournamentToCardProps = (tournament: Tournament) => ({
  id: tournament.tournamentId,
  title: tournament.tournamentName,
  description: tournament.description,
  participants: tournament.maxParticipantCount, // This needs to be updated to actual participant count
  maxParticipants: tournament.maxParticipantCount,
  dueDate: tournament.updatedAt,
  points: 0, // This should be calculated based on tournament rules
  image: "/tournament-banner.jpg", // This should be fetched from tournament data
  teamImages: [], // This should be fetched from participant data
});

export default function Overview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tournaments = useSelector((state: RootState) => state.tournament.tournaments);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await dispatch(fetchTournaments() as any);
      } catch (err) {
        setError('Failed to load data');
        addToast('Failed to load data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch, addToast]);

  const stats: Stat[] = [
    {
      name: "Tournaments Played",
      value: tournaments.filter(t => t.status === TournamentStatus.COMPLETED).length.toString(),
      progress: true,
      icon: UserGroupIcon,
      trend: "up",
    },
    {
      name: "Total Points",
      value: "0", // This should be calculated from tournament results
      progress: true,
      icon: TrophyIcon,
      trend: "up",
    },
    {
      name: "Tournaments Created",
      value: tournaments.filter(t => t.status === TournamentStatus.DRAFT).length.toString(),
      progress: false,
      icon: CalendarIcon,
      trend: "up",
    },
    {
      name: "Win Rate",
      value: "0%", // This should be calculated from tournament results
      progress: true,
      icon: ChartBarIcon,
      trend: "up",
    },
  ];

  const nextTournament = tournaments
    .filter(t => t.status === TournamentStatus.LISTED)
    .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())[0];

  if (isLoading) {
    return <Loading variant="fullscreen" text="Loading overview..." />;
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

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'Player'}!</h1>
            <p className="text-slate-400 mt-1">Here's what's happening with your tournaments.</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/create-tournament')}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-200"
          >
            Create Tournament
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-700/50 rounded-xl">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {stat.progress ? (
                      <p className="text-2xl font-bold text-green-400">{stat.value}</p>
                    ) : (
                      <p className="text-2xl font-bold text-red-400">{stat.value}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity and Upcoming Tournaments */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {tournaments
                .filter(t => t.status === TournamentStatus.COMPLETED)
                .slice(0, 3)
                .map((tournament) => (
                  <div key={tournament.tournamentId} className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <TrophyIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Completed {tournament.tournamentName}</p>
                      <p className="text-sm text-slate-400">
                        {new Date(tournament.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Your Next Tournament */}
          {nextTournament && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-lg font-bold text-white mb-4">Your Next Tournament</h2>
              <div className="relative">
                <TournamentCard
                  {...mapTournamentToCardProps(nextTournament)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tournament Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Tournament Progress</h2>
          <div className="space-y-4">
            {tournaments
              .filter(t => t.status === TournamentStatus.IN_PROGRESS)
              .map((tournament) => (
                <div key={tournament.tournamentId} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-medium">{tournament.tournamentName}</p>
                      <span className="text-sm text-slate-400">
                        {new Date(tournament.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: '50%' }} // This should be calculated based on tournament progress
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