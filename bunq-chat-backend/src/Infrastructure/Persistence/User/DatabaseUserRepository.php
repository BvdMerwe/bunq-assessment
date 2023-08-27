<?php

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use App\Domain\User\UserRepository;
use Exception;
use Illuminate\Database\Capsule\Manager;

class DatabaseUserRepository implements UserRepository
{
    private Manager $manager;
    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @throws Exception
     */
    public function listUsers(): array
    {
        $query = UserModel::all();
        return $query->map(function (UserModel $model) {
            return $model->toDomain();
        })->toArray();
    }

    /**
     * @throws Exception
     */
    public function getUserById(int $userId): User
    {
        $query = UserModel::query()->where('id', $userId)->firstOrFail();
        return $query->toDomain();
    }

    public function findUserByUsername(string $username): User
    {
        $query = UserModel::query()->where('name', $username)->firstOrFail();
        return $query->toDomain();
    }
}