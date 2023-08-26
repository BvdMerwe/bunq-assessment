<?php

namespace App\Domain\Conversation;

interface ConversationRepository
{
    public function listConversations(int $userId): array;
    public function getConversationById(int $userId, int $conversationId): array;
    public function createConversation(int $userId, array $userIds, string $name): array;
}
