import { useWebRTC } from '@/webrtc/useWebRTC';
import { VideoStream } from '@/components/VideoStream';
import { ConnectionStatus } from '@/components/ConnectionStatus';

export const PlayerView = () => {
  const { state } = useWebRTC({
    role: 'player',
    userId: 'player1',
    signalingServerUrl: '/api/signaling',
    mediaConstraints: {
      video: true,
      audio: true
    }
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Player View</h2>
        <ConnectionStatus
          iceState={state.iceConnectionState}
          connectionState={state.connectionState}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Your Stream</h3>
          <VideoStream stream={state.localStream} muted className="h-64" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Remote Stream</h3>
          <VideoStream stream={state.remoteStream} className="h-64" />
        </div>
      </div>
    </div>
  );
}; 