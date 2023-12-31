<?php

declare(strict_types=1);

namespace App\Domain\AuthenticatedUser;

use JsonSerializable;

class AuthenticatedUser implements JsonSerializable
{
    private ?int $id;

    private string $username;

    private string $firstName;

    private string $lastName;
    private string $password;

    public function __construct(?int $id, string $username, string $firstName, string $lastName, string $password)
    {
        $this->id = $id;
        $this->username = strtolower($username);
        $this->firstName = ucfirst($firstName);
        $this->lastName = ucfirst($lastName);
        $this->password = $password;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
        ];
    }

    public function getPassword()
    {
        return $this->password;
    }
}
