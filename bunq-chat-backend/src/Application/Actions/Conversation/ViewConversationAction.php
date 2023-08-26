<?php

declare(strict_types=1);

namespace App\Application\Actions\Conversation;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class ViewConversationAction extends ConversationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator
            ->requirePresence('userId')
            ->requirePresence('conversationId');
        $errors = $validator->validate($this->request->getAttributes());
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }

        $userId = (int) $this->resolveArg('userId');
        $conversationId = (int) $this->resolveArg('conversationId');
        $conversation = $this->repository->getConversationById($userId, $conversationId);

        $this->logger->info("Conversation of id `{$conversationId}` was viewed.");

        return $this->respondWithData($conversation);
    }
}
