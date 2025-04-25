import { useEffect, useRef } from 'react';

interface VideoStreamProps {
  stream: MediaStream | null;
  muted?: boolean;
  className?: string;
}

export const VideoStream = ({ stream, muted = false, className = '' }: VideoStreamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-lg"
        data-testid="video-stream"
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-white">No stream available</div>
        </div>
      )}
    </div>
  );
}; 