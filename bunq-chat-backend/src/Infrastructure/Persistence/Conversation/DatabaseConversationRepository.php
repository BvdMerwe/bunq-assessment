<?php

namespace App\Infrastructure\Persistence\Conversation;

use App\Domain\Conversation\ConversationRepository;
use App\Infrastructure\ApiClient\GuzzleApiClient;
use Exception;

class DatabaseConversationRepository implements ConversationRepository
{
    private GuzzleApiClient $client;
    public function __construct()
    {
        $this->client = new GuzzleApiClient();
    }

    /**
     * @throws Exception
     */
    public function listConversations($userId): array
    {
        if (!$_ENV["MOCK_DATA"]) {
            return $this->client->get("/api/user/$userId/conversation");
        }
        return [
            [
                "id" => 1,
                "name" => "",
                "last_message" => "2021-07-21T08:06:54.000000Z",
                "members" => [
                    [
                        "id" => 7,
                        "name" => "mdemaa",
                        "last_seen_at" => "2021-07-03T06:06:11.000000Z"
                    ]
                ],
            ],
            [
                "id" => 2,
                "name" => "",
                "last_message" => "2021-07-21T08:06:54.000000Z",
                "members" => [

                    [
                        "id" => 9,
                        "name" => "wessel",
                        "last_seen_at" => "2021-07-21T08:07:37.000000Z"
                    ],
                ],
            ],
            [
                "id" => 3,
                "name" => "The nerds",
                "last_message" => "2021-07-21T08:06:54.000000Z",
                "members" => [
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
                    ]
                ],
            ],
        ];
    }

    /**
     * @throws Exception
     */
    public function getConversationById(int $userId, int $conversationId): array
    {
        if (!$_ENV["MOCK_DATA"]) {
            return $this->client->get("/api/user/$userId/conversation/$conversationId");
        }
        $conversations = $this->listConversations($userId);
        $key = array_search($conversationId, array_column($conversations, 'id'));
        return $conversations[$key];
    }

    public function createConversation(int $userId, array $userIds, string $name): array
    {
        if (!$_ENV["MOCK_DATA"]) {
            return $this->client->post("/api/user/$userId/conversation", [
                "user_ids" => $userIds,
                "name" => $name,
            ]);
        }
        return [
            [
                "id" => count($userIds),
                "name" => $name,
                "last_message" => null,
                "members" => [
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
                    ]
                ],
            ],
        ];
    }
}
