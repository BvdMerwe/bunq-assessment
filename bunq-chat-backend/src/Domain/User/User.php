<?php

namespace App\Domain\User;

use DateTime;

class User implements \JsonSerializable
{
    public function __construct(
        ?int $id,
        string $name,
        DateTime $lastSeen,
        string $password
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->lastSeen = $lastSeen;
        $this->password = $password;
    }

    private ?int $id;
    private string $name;
    private DateTime $lastSeen;
    private string $password;

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
            new DateTime($data['last_seen_at']),
            $data['password'] ?? '',
        );
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLastSeen(): DateTime
    {
        return $this->lastSeen;
    }

    public function getPassword()
    {
        return $this->password;
    }
}
