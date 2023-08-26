<?php

namespace App\Domain\User;

use DateTime;

class User implements \JsonSerializable
{
    public function __construct(
        ?int $id,
        string $name,
        DateTime $lastSeen
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->lastSeen = $lastSeen;
    }

    private ?int $id;
    private string $name;
    private DateTime $lastSeen;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_seen_at' => $this->lastSeen->format('Y-m-d\TH:i:s.u\Z'),
        ];
    }

    public static function fromJson(array $data): User
    {
        return new User(
            $data['id'],
            $data['name'],
            new DateTime($data['last_seen_at'])
        );
    }
}
