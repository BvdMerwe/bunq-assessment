<?php

declare(strict_types=1);

namespace App\Domain\AuthenticatedUser;

interface AuthenticatedUserRepository
{
    /**
     * @return AuthenticatedUser[]
     */
    public function findAll(): array;

    /**
     * @param int $id
     * @return AuthenticatedUser
     * @throws UserNotFoundException
     */
    public function getUserById(int $id): AuthenticatedUser;

    /**
     * @param string $username
     * @return AuthenticatedUser
     * @throws UserNotFoundException
     */
    public function findUserByUsername(string $username): AuthenticatedUser;
}
