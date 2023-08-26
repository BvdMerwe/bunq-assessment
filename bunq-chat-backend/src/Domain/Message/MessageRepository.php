<?php

namespace App\Domain\Message;

interface MessageRepository
{
    public function listMessages(int $userId, int $conversationId): array;
    public function createMessage(int $userId, int $conversationId, string $message): array;
}
