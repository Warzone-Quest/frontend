import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface VideoStreamProps {
  stream: MediaStream | null;
  isLocal?: boolean;
  streamId?: string;
}

const VideoStream: React.FC<VideoStreamProps> = ({ stream, isLocal = false, streamId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { streams } = useSelector((state: RootState) => state.webrtc);
  const streamState = streamId ? streams.find(s => s.id === streamId) : null;

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal || streamState?.isMuted}
        className={`w-full h-full object-cover ${isLocal ? 'scale-x-[-1]' : ''}`}
      />
      {streamState?.isVideoOff && isLocal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-lg">Video Off</p>
        </div>
      )}
    </div>
  );
};

export default VideoStream; 