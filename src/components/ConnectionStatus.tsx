interface ConnectionStatusProps {
  iceState: RTCIceConnectionState;
  connectionState: RTCPeerConnectionState;
}

const getStatusColor = (state: string) => {
  switch (state) {
    case 'connected':
    case 'completed':
      return 'bg-green-500';
    case 'connecting':
    case 'checking':
      return 'bg-yellow-500';
    case 'disconnected':
    case 'failed':
    case 'closed':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const ConnectionStatus = ({ iceState, connectionState }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(iceState)} mr-2`} />
        <span className="text-sm">ICE: {iceState}</span>
      </div>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(connectionState)} mr-2`} />
        <span className="text-sm">Connection: {connectionState}</span>
      </div>
    </div>
  );
}; 