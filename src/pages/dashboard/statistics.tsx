import { useState } from 'react';
import { TrophyIcon, ChartBarIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline';

const performanceData = {
  weekly: {
    winRate: 68,
    totalMatches: 24,
    avgScore: 2150,
    topPosition: 1,
    tournamentWins: 2,
  },
  monthly: {
    winRate: 64,
    totalMatches: 86,
    avgScore: 1950,
    topPosition: 2,
    tournamentWins: 5,
  },
  allTime: {
    winRate: 61,
    totalMatches: 342,
    avgScore: 1850,
    topPosition: 1,
    tournamentWins: 15,
  },
};

type TimeRange = 'weekly' | 'monthly' | 'allTime';

export default function Statistics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const stats = performanceData[timeRange];

  const StatCard = ({ title, value, icon: Icon, trend = 0 }: { title: string, value: string, icon: React.ElementType, trend?: number }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-slate-700/50 rounded-xl">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        {trend !== 0 && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-slate-400 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Statistics</h1>
        <p className="text-slate-400 mt-1">Track your gaming performance and progress.</p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 inline-flex gap-2">
        <button
          onClick={() => setTimeRange('weekly')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            timeRange === 'weekly'
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeRange('monthly')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            timeRange === 'monthly'
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeRange('allTime')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            timeRange === 'allTime'
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          icon={ChartBarIcon}
          trend={3.2}
        />
        <StatCard
          title="Total Matches"
          value={stats.totalMatches.toString()}
          icon={ClockIcon}
          trend={5.1}
        />
        <StatCard
          title="Average Score"
          value={stats.avgScore.toString()}
          icon={FireIcon}
          trend={-1.4}
        />
        <StatCard
          title="Tournament Wins"
          value={stats.tournamentWins.toString()}
          icon={TrophyIcon}
          trend={2.8}
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-lg font-semibold text-white mb-6">Performance Trend</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500/20 rounded-t-lg hover:bg-blue-500/30 transition-colors duration-200"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-slate-400">{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-lg font-semibold text-white mb-6">Recent Achievements</h2>
        <div className="space-y-4">
          {[
            { title: 'Tournament Victory', description: 'Won Winter Championship 2024', date: '2 days ago', icon: TrophyIcon },
            { title: 'High Score', description: 'Reached 2500 points in single match', date: '5 days ago', icon: FireIcon },
            { title: 'Win Streak', description: '10 matches won in a row', date: '1 week ago', icon: ChartBarIcon },
          ].map((achievement, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{achievement.title}</p>
                <p className="text-sm text-slate-400">{achievement.description}</p>
              </div>
              <span className="text-sm text-slate-500">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 