interface ControlButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
    >
      {children}
    </button>
  );
}; 