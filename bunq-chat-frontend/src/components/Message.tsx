import classNames from 'classnames';

interface MessageProps {
  className?: string;
  isMe?: boolean;
  message: string;
  timestamp: string;
  name: string;
}

export default function Message({ className = '', message, timestamp, isMe = false, name }: MessageProps) {
  return (
    <div className={classNames('message', { me: isMe, you: !isMe }, className)}>
      <div className="body">
        <p className="text-sm text-white/50">{name}</p>
        <main>{message}</main>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
}
