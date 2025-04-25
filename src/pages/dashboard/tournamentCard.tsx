import { motion } from 'framer-motion';
import {
  TrophyIcon,
  ClockIcon,
  WindowIcon
} from '@heroicons/react/24/outline';

interface TournamentCardProps {
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

export function TournamentCard({
  title,
  description,
  participants,
  maxParticipants = 24,
  dueDate,
  points = 12500,
  image = "/tournament-banner.jpg",
  teamImages = [],
}: TournamentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-800/50 hover:from-slate-700/50 hover:via-slate-600/50 hover:to-slate-700/50 rounded-3xl shadow-md hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 ease-out overflow-hidden w-full border border-slate-600/50 backdrop-blur-sm"
    >
      {/* Banner Image */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Overlay with time */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center space-x-2">
          <ClockIcon className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">07:45:24</span>
        </div>
        {/* Game Type */}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <WindowIcon className="w-5 h-5 text-white" />
          <span className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-white">League</span>
        </div>

        {/* Date */}
        <div className="absolute bottom-0 left-0 flex items-center space-x-2">
          <div className="bg-black/40 backdrop-blur-sm rounded-tr-lg px-3 py-1.5 text-white text-sm">
            {new Date(dueDate).toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: 'numeric'
            }).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{title}</h3>
          <p className="text-slate-400 text-sm line-clamp-2">{description}</p>
        </div>

        {/* Points and Join Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="bg-yellow-400/10 text-yellow-400 rounded-full px-4 py-1.5 flex items-center space-x-1">
            <TrophyIcon className="w-4 h-4" />
            <span className="font-bold">{points.toLocaleString()} pts</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-1.5 text-sm font-medium transition-colors">
            Join Tournament
          </button>
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            {teamImages.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Participant ${index + 1}`}
                className="w-8 h-8 rounded-full border-2 border-slate-800 object-cover"
              />
            ))}
            {participants > 4 && (
              <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center">
                <span className="text-xs font-medium text-white">+{participants - 4}</span>
              </div>
            )}
          </div>
          <div className="text-sm text-slate-400">
            {participants}/{maxParticipants} Slots
          </div>
        </div>
      </div>
    </motion.div>
  );
} 