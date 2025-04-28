import { TrophyIcon, UserGroupIcon, CalendarIcon, ChartBarIcon, BellIcon } from "@heroicons/react/24/outline";
import { TournamentCard } from "@/pages/dashboard/tournamentCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { tournamentApi, TournamentModel } from "@/api/tournament.api";
import { userApi, NotificationModel, UserProfileModel } from "@/api/user.api";
import { useNavigate } from "react-router";

const stats = [
  {
    name: "Tournaments Played",
    value: "12",
    progress: true,
    icon: UserGroupIcon,
    trend: "up",
  },
  {
    name: "Total Points",
    value: "2,847",
    progress: true,
    icon: TrophyIcon,
    trend: "up",
  },
  {
    name: "Tournaments Created",
    value: "0",
    progress: false,
    icon: CalendarIcon,
    trend: "up",
  },
  {
    name: "Win Rate",
    value: "64.2%",
    progress: true,
    icon: ChartBarIcon,
    trend: "up",
  },
];

export default function Overview() {
  const [user, setUser] = useState<UserProfileModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingTournaments, setUpcomingTournaments] = useState<TournamentModel[]>([]);
  const [tournament, setTournament] = useState<TournamentModel>();
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        try {
          const currentUser = await userApi.fetchProfile();
          setUser(currentUser);
          console.log(currentUser);
          return;
        } catch (error) {
          console.error(error);
          return  navigate("/auth/login");
        }
      }
 
      try {
        setIsLoading(true);
        const notifications = await userApi.fetchNotifications(user.userId);
        setNotifications(notifications);

        const participatedTournamentsRegistrations = await tournamentApi.fetchParticipatedTournaments(user.userId);
        const now = new Date();
        let latestTournament: TournamentModel | undefined;
        const participatedTournaments = await Promise.all(participatedTournamentsRegistrations.map((registration) => {
          return tournamentApi.fetchTournament(registration.tournamentId);
        }));
        const upcomingTournaments = participatedTournaments.filter((tournament) => {
          const tournamentDate = new Date(tournament.startsAtTime);
          if (!latestTournament || (tournamentDate < new Date(latestTournament.startsAtTime) && tournamentDate > now)) {
            latestTournament = tournament;
          }
          return tournamentDate > now;
        });
        setUpcomingTournaments(upcomingTournaments);
        setTournament(latestTournament);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (isLoading ? <LoadingScreen /> : (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h1>
          <p className="text-slate-400 mt-1">Here's what's happening with your tournaments.</p>
        </div>
        <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-200">
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

      {/* Notifications and Upcoming Tournaments */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BellIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{notification.title}</p>
                  <p className="text-sm text-slate-400">{notification.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Tournament */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4">Your Next Tournament</h2>
          <div className="relative">
            {tournament && <TournamentCard {...tournament} />}
          </div>
        </div>
      </div>

      {/* Upcoming Tournaments */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-lg font-bold text-white mb-4">Upcoming Tournaments</h2>
        <div className="space-y-4">
          {upcomingTournaments.map((tournament, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{tournament.tournamentName}</p>
                  <span className="text-sm text-slate-400">{tournament.currentParticipants}/{tournament.maxParticipantCount} Players</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(tournament.currentParticipants/tournament.maxParticipantCount)*100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));
}