<?php

namespace App\Infrastructure\Persistence\Message;

use App\Domain\Message\MessageRepository;
use App\Infrastructure\ApiClient\GuzzleApiClient;

class DatabaseMessageRepository implements MessageRepository
{
    private GuzzleApiClient $client;
    public function __construct()
    {
        $this->client = new GuzzleApiClient();
    }
    public function listMessages(int $userId, int $conversationId): array
    {
        if (!$_ENV["MOCK_DATA"]) {
            return $this->client->get("/api/user/$userId/conversation/$conversationId/message");
        }
        return [
            [
                "id" => 27,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:51.000000Z",
            ],
            [
                "id" => 26,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:50.000000Z",
            ],
            [
                "id" => 25,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:50.000000Z",
            ],
            [
                "id" => 24,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:49.000000Z",
            ],
            [
                "id" => 23,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:47.000000Z",
            ],
            [
                "id" => 22,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:47.000000Z",
            ],
            [
                "id" => 21,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:46.000000Z",
            ],
            [
                "id" => 20,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:46.000000Z",
            ],
            [
                "id" => 19,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:45.000000Z",
            ],
            [
                "id" => 18,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:45.000000Z",
            ],
            [
                "id" => 17,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:44.000000Z",
            ],
            [
                "id" => 16,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:44.000000Z",
            ],
            [
                "id" => 15,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:44.000000Z",
            ],
            [
                "id" => 14,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:43.000000Z",
            ],
            [
                "id" => 13,
                "user_id" => 9,
                "text" => generateRandomString(),
                "sent_at" => "2021-07-21T08:08:43.000000Z",
            ]
        ];
    }

    public function createMessage(int $userId, int $conversationId, string $message): array
    {
        if (!$_ENV["MOCK_DATA"]) {
            return $this->client->post("/api/user/$userId/conversation/$conversationId/message", [
                'text' => $message,
            ]);
        }
        return [
            "id" => 2,
            "user_id" => $userId,
            "text" => $message,
            "sent_at" => "2021-07-21T08:08:15.000000Z",
        ];
    }
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
