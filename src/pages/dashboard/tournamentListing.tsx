import { useEffect, useState } from 'react';
import { TournamentCard } from '@/pages/dashboard/tournamentCard';
import { TournamentStatus, TournamentStatusInProgress, TournamentStatusListed, TournamentStatusCompleted, TournamentModel, tournamentApi } from '@/api/tournament.api';

type FilterType = 'ALL' | TournamentStatus;

const filterOptions = [
  { id: 'ALL', label: 'All Tournaments' },
  { id: TournamentStatusInProgress, label: 'Live Now' },
  { id: TournamentStatusListed, label: 'Upcoming' },
  { id: TournamentStatusCompleted, label: 'Completed' },
] as const;

export default function TournamentListing() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [tournaments, setTournaments] = useState<TournamentModel[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setTournaments(await tournamentApi.fetchAllTournaments(activeFilter === 'ALL' ? undefined : activeFilter));
      } catch (error) {
        console.error(error);
      }
    }

    fetchTournaments()
  }, [activeFilter])

  return (
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.tournamentId}
            {...tournament}
          />
        ))}
      </div>
    </div>
  );
}
