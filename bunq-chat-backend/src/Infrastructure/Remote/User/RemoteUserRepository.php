<?php

namespace App\Infrastructure\Remote\User;

use App\Domain\User\User;
use App\Domain\User\UserRepository;
use App\Infrastructure\ApiClient\GuzzleApiClient;
use Exception;

class RemoteUserRepository implements UserRepository
{
    private GuzzleApiClient $client;
    public function __construct()
    {
        $this->client = new GuzzleApiClient();
    }

    /**
     * @throws Exception
     */
    public function listUsers(): array
    {
//        return $this->client->get('/api/user');
        return [
            [
                "id" => 9,
                "name" => "wessel",
                "last_seen_at" => "2021-07-21T08:07:37.000000Z"
            ],
            [
                "id" => 8,
                "name" => "nick",
                "last_seen_at" => "2021-06-17T16:06:11.000000Z"
            ],
            [
                "id" => 7,
                "name" => "mdemaa",
                "last_seen_at" => "2021-07-03T06:06:11.000000Z"
            ],
            [
                "id" => 6,
                "name" => "jordy",
                "last_seen_at" => "2021-06-24T10:06:11.000000Z"
            ],
            [
                "id" => 5,
                "name" => "jesper",
                "last_seen_at" => "2021-07-19T08:06:11.000000Z"
            ],
            [
                "id" => 4,
                "name" => "hilco",
                "last_seen_at" => "2021-06-15T01:06:11.000000Z"
            ],
            [
                "id" => 3,
                "name" => "bram",
                "last_seen_at" => "2021-07-20T12:06:11.000000Z"
            ],
            [
                "id" => 2,
                "name" => "andre",
                "last_seen_at" => "2021-06-27T22:06:11.000000Z"
            ],
            [
                "id" => 1,
                "name" => "ali",
                "last_seen_at" => "2021-07-21T08:06:54.000000Z"
            ]
        ];
    }

    /**
     * @throws Exception
     */
    public function getUserById(int $userId): User
    {
//        return User::fromJson($this->client->get("/api/user/$userId"));
        $users = $this->listUsers();
        $key = array_search($userId, array_column($users, 'id'));
        return User::fromJson($users[$key]);
    }
}