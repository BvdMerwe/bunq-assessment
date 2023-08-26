<?php

declare(strict_types=1);

namespace App\Application\Actions\Conversation;

use Psr\Http\Message\ResponseInterface as Response;

class ListConversationAction extends ConversationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $userId = $this->resolveArg('userId');
        $conversations = $this->repository->listConversations($userId);

        $this->logger->info("Conversation list was viewed.");

        return $this->respondWithData($conversations);
    }
}
