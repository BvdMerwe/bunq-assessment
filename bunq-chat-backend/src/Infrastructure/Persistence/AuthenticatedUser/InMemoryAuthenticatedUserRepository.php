<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\AuthenticatedUser;

use App\Domain\AuthenticatedUser\AuthenticatedUser;
use App\Domain\AuthenticatedUser\UserNotFoundException;
use App\Domain\AuthenticatedUser\AuthenticatedUserRepository;

class InMemoryAuthenticatedUserRepository implements AuthenticatedUserRepository
{
    /**
     * @var AuthenticatedUser[]
     */
    private array $users;

    /**
     * @param AuthenticatedUser[]|null $users
     */
    public function __construct(array $users = null)
    {
        $this->users = $users ?? [
            1 => new AuthenticatedUser(
                1,
                'ob1.kenobi',
                'Obi-Wan',
                'Kenobi',
                password_hash('Test1234', PASSWORD_BCRYPT)
            ),
            2 => new AuthenticatedUser(
                2,
                'darth.v',
                'Anakin',
                'Skywalker',
                password_hash('Test1234', PASSWORD_BCRYPT)
            ),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        return array_values($this->users);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserOfId(int $id): AuthenticatedUser
    {
        if (!isset($this->users[$id])) {
            throw new UserNotFoundException();
        }

        return $this->users[$id];
    }

    /**
     * {@inheritdoc}
     */
    public function findUserByUsername(string $username): AuthenticatedUser
    {
        $userIndex = array_search($username, array_column($this->users, 'username'));

        if (!isset($userIndex)) {
            throw new UserNotFoundException();
        }
        return $this->users[$userIndex + 1];
    }
}
