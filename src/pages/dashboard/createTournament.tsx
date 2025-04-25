import { useState } from 'react';
import { PhotoIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface TournamentForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  entryPoints: number;
  prizePool: number;
  image: File | null;
  rules: string;
  gameType: 'solo' | 'team';
  format: 'elimination' | 'roundRobin' | 'swiss';
}

export default function CreateTournament() {
  const [form, setForm] = useState<TournamentForm>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: 32,
    entryPoints: 1000,
    prizePool: 10000,
    image: null,
    rules: '',
    gameType: 'solo',
    format: 'elimination'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Tournament</h1>
        <p className="text-slate-400 mt-1">Fill in the details to create your tournament.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                Tournament Title
              </label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tournament title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your tournament"
              />
            </div>
          </div>
        </div>

        {/* Tournament Details */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Tournament Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                id="startDate"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-slate-300 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-slate-300 mb-1">
                Max Participants
              </label>
              <input
                type="number"
                id="maxParticipants"
                value={form.maxParticipants}
                onChange={(e) => setForm({ ...form, maxParticipants: parseInt(e.target.value) })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="entryPoints" className="block text-sm font-medium text-slate-300 mb-1">
                Entry Points
              </label>
              <input
                type="number"
                id="entryPoints"
                value={form.entryPoints}
                onChange={(e) => setForm({ ...form, entryPoints: parseInt(e.target.value) })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tournament Format */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Tournament Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Game Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gameType: 'solo' })}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${
                    form.gameType === 'solo'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <UserGroupIcon className="w-5 h-5" />
                  Solo
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gameType: 'team' })}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${
                    form.gameType === 'team'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <UserGroupIcon className="w-5 h-5" />
                  Team
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Tournament Format
              </label>
              <select
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value as TournamentForm['format'] })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="elimination">Single Elimination</option>
                <option value="roundRobin">Round Robin</option>
                <option value="swiss">Swiss System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tournament Banner */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Tournament Banner</h2>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer hover:border-slate-500 bg-slate-900/30"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <PhotoIcon className="w-12 h-12 text-slate-400 mb-3" />
                <p className="mb-2 text-sm text-slate-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
          >
            Create Tournament
          </button>
        </div>
      </form>
    </div>
  );
} 