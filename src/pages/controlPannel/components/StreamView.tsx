import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface StreamViewProps {
  className?: string;
  streamId?: string;
}

export const StreamView: React.FC<StreamViewProps> = ({ className = '', streamId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { streams, activeStreamId } = useSelector((state: RootState) => state.webrtc);
  
  const stream = streamId 
    ? streams.find(s => s.id === streamId)
    : streams.find(s => s.id === activeStreamId);

  useEffect(() => {
    if (videoRef.current && stream?.stream) {
      videoRef.current.srcObject = stream.stream;
    }
  }, [stream]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={stream?.isMuted}
        className="w-full h-full object-cover rounded-lg"
      />
      {(!stream || !stream.stream) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <p className="text-white">No stream available</p>
        </div>
      )}
      {stream?.isVideoOff && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <p className="text-white">Video Off</p>
        </div>
      )}
    </div>
  );
}; 