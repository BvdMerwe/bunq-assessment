<?php

declare(strict_types=1);

namespace App\Application\Actions\Message;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class ListMessageAction extends MessageAction
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
        $conversations = $this->repository->listMessages($userId, $conversationId);

        $this->logger->info("Conversation list was viewed.");

        return $this->respondWithData($conversations);
    }
}
