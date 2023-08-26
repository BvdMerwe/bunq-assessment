<?php

namespace App\Domain\Conversation;

class Conversation implements \JsonSerializable
{
    public function __construct(
        int $id,
        string $name,
        array $members,
        \DateTime $lastMessage
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->members = $members;
        $this->lastMessage = $lastMessage;
    }

    private int $id;
    private string $name;
    private array $members;
    private \DateTime $lastMessage;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'members' => $this->members,
            'last_message_at' => $this->lastMessage->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }

    public static function fromJson(array $data): Conversation
    {
        return new Conversation(
            $data['id'],
            $data['name'],
            $data['members'],
            new \DateTime($data['last_message_at'])
        );
    }
}
