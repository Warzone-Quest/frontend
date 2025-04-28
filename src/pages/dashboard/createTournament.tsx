import { useState } from 'react';
import { useNavigate } from 'react-router';
import { tournamentApi, TournamentModel } from '@/api/tournament.api';

const initialTournamentState: Partial<TournamentModel> = {
  tournamentName: '',
  tournamentGenre: '',
  description: '',
  game: '',
  moderators: [],
  maxParticipantCount: 32,
  status: 'DRAFT',
  listingTime: '',
  locksAtTime: '',
  movesToLobbyTime: '',
  startsAtTime: '',
  endsAtTime: '',
  completedAtTime: '',
  bannerImageUrl: '',
  thumbnailImageUrl: '',
  prizePool: 0,
  entryFee: 0,
  currentParticipants: 0,
  platform: '',
  region: '',
  rules: '',
  streamUrl: '',
  isPrivate: false,
  tags: [],
  customFields: {},
  metadata: {}
};

export default function CreateTournament() {
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Partial<TournamentModel>>(initialTournamentState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const newTournament = await tournamentApi.createTournament(tournament as TournamentModel);
      navigate(`/tournaments/${newTournament.tournamentId}`);
    } catch (err) {
      setError('Failed to create tournament. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTournament(prev => ({
      ...prev,
      [name]: name === 'maxParticipantCount' || name === 'prizePool' || name === 'entryFee' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Tournament</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Tournament Name</label>
              <input
                type="text"
                name="tournamentName"
                value={tournament.tournamentName}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                value={tournament.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Game</label>
                <input
                  type="text"
                  name="game"
                  value={tournament.game}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Genre</label>
                <input
                  type="text"
                  name="tournamentGenre"
                  value={tournament.tournamentGenre}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Details */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Tournament Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Max Participants</label>
              <input
                type="number"
                name="maxParticipantCount"
                value={tournament.maxParticipantCount}
                onChange={handleChange}
                min="2"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Entry Fee</label>
              <input
                type="number"
                name="entryFee"
                value={tournament.entryFee}
                onChange={handleChange}
                min="0"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Prize Pool</label>
              <input
                type="number"
                name="prizePool"
                value={tournament.prizePool}
                onChange={handleChange}
                min="0"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Platform</label>
              <input
                type="text"
                name="platform"
                value={tournament.platform}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Region</label>
              <input
                type="text"
                name="region"
                value={tournament.region}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Stream URL</label>
              <input
                type="url"
                name="streamUrl"
                value={tournament.streamUrl}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={tournament.tags?.join(', ')}
                onChange={(e) => {
                  const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                  setTournament(prev => ({ ...prev, tags }));
                }}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                checked={tournament.isPrivate}
                onChange={(e) => setTournament(prev => ({ ...prev, isPrivate: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-700 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="isPrivate" className="text-sm font-medium text-slate-300">
                Private Tournament
              </label>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Schedule</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Listing Time</label>
              <input
                type="datetime-local"
                name="listingTime"
                value={tournament.listingTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Lock Time</label>
              <input
                type="datetime-local"
                name="locksAtTime"
                value={tournament.locksAtTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Lobby Time</label>
              <input
                type="datetime-local"
                name="movesToLobbyTime"
                value={tournament.movesToLobbyTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Start Time</label>
              <input
                type="datetime-local"
                name="startsAtTime"
                value={tournament.startsAtTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">End Time</label>
              <input
                type="datetime-local"
                name="endsAtTime"
                value={tournament.endsAtTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Completion Time</label>
              <input
                type="datetime-local"
                name="completedAtTime"
                value={tournament.completedAtTime}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Media</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Banner Image URL</label>
              <input
                type="url"
                name="bannerImageUrl"
                value={tournament.bannerImageUrl}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Thumbnail Image URL</label>
              <input
                type="url"
                name="thumbnailImageUrl"
                value={tournament.thumbnailImageUrl}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Rules</h2>
          <textarea
            name="rules"
            value={tournament.rules}
            onChange={handleChange}
            rows={5}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Custom Fields */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Custom Fields</h2>
          <div className="space-y-4">
            {Object.entries(tournament.customFields || {}).map(([key, value], index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    const newCustomFields = { ...tournament.customFields };
                    delete newCustomFields[key];
                    newCustomFields[e.target.value] = value;
                    setTournament(prev => ({ ...prev, customFields: newCustomFields }));
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Field Name"
                />
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => {
                    setTournament(prev => ({
                      ...prev,
                      customFields: { ...prev.customFields, [key]: e.target.value }
                    }));
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Field Value"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setTournament(prev => ({
                  ...prev,
                  customFields: { ...prev.customFields, '': '' }
                }));
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              + Add Custom Field
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Metadata</h2>
          <div className="space-y-4">
            {Object.entries(tournament.metadata || {}).map(([key, value], index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    const newMetadata = { ...tournament.metadata };
                    delete newMetadata[key];
                    newMetadata[e.target.value] = value;
                    setTournament(prev => ({ ...prev, metadata: newMetadata }));
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Metadata Key"
                />
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => {
                    setTournament(prev => ({
                      ...prev,
                      metadata: { ...prev.metadata, [key]: e.target.value }
                    }));
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Metadata Value"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setTournament(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, '': '' }
                }));
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              + Add Metadata
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Tournament'}
          </button>
        </div>
      </form>
    </div>
  );
} 