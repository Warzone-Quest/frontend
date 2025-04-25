import { ReactNode } from 'react';

interface ControlPanelProps {
  children: ReactNode;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  return (
    <div className="bg-indigo-900/50 rounded-lg p-4 flex flex-col gap-2">
      {children}
    </div>
  );
}; 