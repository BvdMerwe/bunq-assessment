<?php

declare(strict_types=1);

namespace App\Application\Actions\Conversation;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class CreateConversationAction extends ConversationAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator
            ->requirePresence('userId')
            ->requirePresence('userIds');
        $errors = $validator->validate($this->request->getAttributes());
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }
        $userId = $this->resolveArg('userId');
        $userIds = $this->resolveArg('userIds');
        $name = $this->resolveArg('name');
        $conversations = $this->repository
            ->createConversation($userId, $userIds, $name);

        $this->logger->info("Conversation was created.");

        return $this->respondWithData($conversations);
    }
}
