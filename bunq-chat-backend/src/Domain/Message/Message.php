<?php

namespace App\Domain\Message;

class Message implements \JsonSerializable
{
    private int $id;
    private string $message;
    private int $senderId;
    private \DateTime $sentAt;

    public function __construct(int $id, string $message, int $senderId, \DateTime $sentAt)
    {
        $this->id = $id;
        $this->message = $message;
        $this->senderId = $senderId;
        $this->sentAt = $sentAt;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->message,
            'user_id' => $this->senderId,
            'sent_at' => $this->sentAt->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }

    /**
     * @throws \Exception
     */
    public static function fromJson(array $data): Message
    {
        return new Message(
            $data['id'],
            $data['text'],
            $data['user_id'],
            new \DateTime($data['sent_at'])
        );
    }
}
