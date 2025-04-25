import { useState } from 'react';
import { TournamentCard } from '@/pages/dashboard/tournamentCard';

interface Tournament {
  id: string;
  title: string;
  description: string;
  participants: number;
  maxParticipants: number;
  dueDate: string;
  points: number;
  image?: string;
  teamImages?: string[];
}

type FilterType = 'all' | 'live' | 'upcoming' | 'participated' | 'completed';

const filterOptions = [
  { id: 'all', label: 'All Tournaments' },
  { id: 'live', label: 'Live Now' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'participated', label: 'Participated' },
  { id: 'completed', label: 'Completed' },
] as const;

export default function TournamentListing() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const tournaments: Tournament[] = [
    {
      id: "1",
      title: "Winter 2025 Tournament",
      description: "Compete with your friends in this winter season themed championship.",
      participants: 19,
      maxParticipants: 24,
      dueDate: "2025-01-18T15:00:00",
      points: 12500,
      image: "https://images.unsplash.com/photo-1737365506116-ef7eba797492?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      teamImages: [
        "/avatar-1.jpg",
        "/avatar-2.jpg",
        "/avatar-3.jpg",
        "/avatar-4.jpg",
      ]
    },
    {
      id: "2",
      title: "Spring Championship",
      description: "Join the most anticipated spring gaming event of the year.",
      participants: 15,
      maxParticipants: 32,
      dueDate: "2025-04-01T14:30:00",
      points: 15000,
      image: "https://images.unsplash.com/photo-1737365506116-ef7eba797492?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      teamImages: [
        "/avatar-5.jpg",
        "/avatar-6.jpg",
      ]
    },
    {
      id: "3",
      title: "Summer League Finals",
      description: "The ultimate summer showdown. Show your skills and claim victory.",
      participants: 28,
      maxParticipants: 32,
      dueDate: "2025-07-15T18:00:00",
      points: 20000,
      image: "https://images.unsplash.com/photo-1737365506116-ef7eba797492?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      teamImages: [
        "/avatar-7.jpg",
        "/avatar-8.jpg",
        "/avatar-9.jpg",
      ]
    },
    {
      id: "4",
      title: "Fall Cup Challenge",
      description: "Autumn's premier gaming tournament with exclusive rewards.",
      participants: 12,
      maxParticipants: 24,
      dueDate: "2025-10-05T16:00:00",
      points: 18000,
      image: "https://images.unsplash.com/photo-1737365506116-ef7eba797492?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      teamImages: [
        "/avatar-10.jpg",
        "/avatar-11.jpg",
      ]
    }
  ];

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
            key={tournament.id}
            {...tournament}
          />
        ))}
      </div>
    </div>
  );
}
