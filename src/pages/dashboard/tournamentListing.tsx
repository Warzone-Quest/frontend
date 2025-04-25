import { useState, useEffect } from 'react';
import { TournamentCard } from '@/pages/dashboard/tournamentCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTournaments } from '@/store/slices/tournamentSlice';
import { Loading } from '@/components/ui/Loading';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';
import { Tournament, TournamentStatus } from '@/types/tournament';

type FilterType = 'all' | 'live' | 'upcoming' | 'participated' | 'completed';

const filterOptions = [
  { id: 'all', label: 'All Tournaments' },
  { id: 'live', label: 'Live Now' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'participated', label: 'Participated' },
  { id: 'completed', label: 'Completed' },
] as const;

const mapTournamentToCardProps = (tournament: Tournament) => ({
  id: tournament.tournamentId,
  title: tournament.tournamentName,
  description: tournament.description,
  participants: tournament.currentParticipantCount ?? 0,
  maxParticipants: tournament.maxParticipantCount,
  dueDate: tournament.startTime ?? tournament.updatedAt,
  points: tournament.prizePool ?? 0,
  image: tournament.bannerImage ?? "/tournament-banner.jpg",
  teamImages: tournament.teamImages ?? [],
  status: tournament.status,
});

export default function TournamentListing() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tournaments = useSelector((state: RootState) => state.tournament.tournaments);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await dispatch(fetchTournaments() as any);
      } catch (err) {
        setError('Failed to load tournaments');
        addToast('Failed to load tournaments', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadTournaments();
  }, [dispatch, addToast]);

  const filteredTournaments = tournaments.filter((tournament: Tournament) => {
    switch (activeFilter) {
      case 'live':
        return tournament.status === TournamentStatus.IN_PROGRESS;
      case 'upcoming':
        return tournament.status === TournamentStatus.LISTED;
      case 'completed':
        return tournament.status === TournamentStatus.COMPLETED;
      case 'participated':
        return tournament.participants?.includes(user?.userId ?? '') ?? false;
      default:
        return true;
    }
  });

  if (isLoading) {
    return <Loading variant="fullscreen" text="Loading tournaments..." />;
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
        {/* Filters */}
        <div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterType)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.id
                    ? 'bg-blue-500/50 text-white shadow-lg shadow-blue-400/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600/90'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Grid */}
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No tournaments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament: Tournament) => (
              <TournamentCard
                key={tournament.tournamentId}
                {...mapTournamentToCardProps(tournament)}
              />
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
