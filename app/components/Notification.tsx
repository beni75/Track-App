import { Info } from 'lucide-react';
import { useEffect } from 'react';

type NotificationProps = { message: string; onclose: () => void };

export default function Notification({ message, onclose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onclose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onclose]);
  return (
    <div className="toast toast-bottom toast-left mb-4 mr-4 p-2">
      <div className="alert p-2 text-sm shadow-lg">
        <Info className="w-4 font-bold text-accent" />
        <span className="flex items-center">{message}</span>
      </div>
    </div>
  );
}
