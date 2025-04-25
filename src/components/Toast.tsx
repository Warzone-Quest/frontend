import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeToast } from '@/store/slices/toastSlice';
import { Toast as ToastType } from '@/store/slices/toastSlice';

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = toasts.map((toast: ToastType) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration || 3000);
      return timer;
    });

    return () => {
      timers.forEach((timer: NodeJS.Timeout) => clearTimeout(timer));
    };
  }, [toasts, dispatch]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map((toast: ToastType) => (
        <div
          key={toast.id}
          className={`mb-2 p-4 rounded-lg shadow-lg ${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          } text-white`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast; 