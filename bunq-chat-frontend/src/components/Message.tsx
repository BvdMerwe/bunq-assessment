import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  className?: string;
  isMe?: boolean;
  message: string;
  timestamp: Date;
  name: string;
}

export default function Message({ className = '', message, timestamp, isMe = false, name }: MessageProps) {
  return (
    <div className={classNames('message', { me: isMe, you: !isMe }, className)}>
      <div className="body">
        <p className="text-sm text-white/50">{name}</p>
        <main className="min-w-[120px]">{message}</main>
        {timestamp.getTime() > 0 ? (
          <span className="timestamp">{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
        ) : (
          <span className="timestamp">Sending...</span>
        )}
      </div>
    </div>
  );
}
