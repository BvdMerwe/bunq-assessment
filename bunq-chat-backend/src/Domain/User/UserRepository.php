<?php

namespace App\Domain\User;

interface UserRepository
{
    public function listUsers(): array;
    public function getUserById(int $userId): User;
    public function findUserByUsername(string $username): User;
}
