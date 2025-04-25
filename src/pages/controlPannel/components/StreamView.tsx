interface StreamViewProps {
  className?: string;
}

export const StreamView: React.FC<StreamViewProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white/10 rounded-lg ${className}`}>
      {/* Stream content will be added here */}
    </div>
  );
}; 