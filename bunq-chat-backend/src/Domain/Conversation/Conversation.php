<?php

namespace App\Domain\Conversation;

use App\Domain\Message\Message;
use App\Infrastructure\Persistence\Conversation\ConversationModel;

class Conversation implements \JsonSerializable
{
    public function __construct(
        int $id,
        ?string $name,
        array $members,
        ?Message $lastMessage
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->members = $members;
        $this->lastMessage = $lastMessage;
    }

    private int $id;
    private ?string $name;
    private array $members;
    private ?Message $lastMessage;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'members' => $this->members,
            'last_message' => isset($this->lastMessage) ? $this->lastMessage->jsonSerialize() : null,
        ];
    }

    public static function fromJson(array $data): Conversation
    {
        return new Conversation(
            $data['id'],
            $data['name'],
            $data['members'],
            $data['last_message'] ? Message::fromJson($data['last_message']) : null
        );
    }

    public function getId(): int
    {
        return $this->id;
    }
    public function getName(): string
    {
        return $this->name;
    }
    public function getMembers(): array
    {
        return $this->members;
    }
    public function getLastMessage(): \DateTime
    {
        return $this->lastMessage;
    }
}
