import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { WebRTCConnection } from '../../components/WebRTCConnection';
import VideoStream from '../../components/VideoStream';
import { ConnectionStatus } from '../../components/ConnectionStatus';
import { setCurrentTournament, setCurrentUser } from '../../store/slices/webrtc/webrtc.slice';
import { useEffect } from 'react';

export const PlayerView = () => {
  const dispatch = useDispatch();
  const { currentTournamentId, currentUserId, connectionStatus } = useSelector((state: RootState) => state.webrtc);

  // Initialize player connection
  useEffect(() => {
    dispatch(setCurrentTournament('current-tournament-id')); // Replace with actual tournament ID
    dispatch(setCurrentUser('player1')); // Replace with actual player ID
  }, [dispatch]);

  const getConnectionState = (): RTCPeerConnectionState => {
    switch (connectionStatus) {
      case 'connected':
        return 'connected';
      case 'connecting':
        return 'connecting';
      case 'disconnected':
        return 'disconnected';
      case 'error':
        return 'failed';
      default:
        return 'disconnected';
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Player View</h2>
        <ConnectionStatus
          iceState={connectionStatus === 'connected' ? 'connected' : 'disconnected'}
          connectionState={getConnectionState()}
        />
      </div>

      {currentTournamentId && currentUserId && (
        <WebRTCConnection
          tournamentId={currentTournamentId}
          userId={currentUserId}
          isProducer={false}
        />
      )}
    </div>
  );
}; 