<?php

declare(strict_types=1);

namespace App\Application\Actions\Message;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class CreateMessageAction extends MessageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator
            ->requirePresence('userId')
            ->requirePresence('conversationId')
            ->requirePresence('message');
        $errors = $validator->validate($this->request->getAttributes());
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }

        $userId = (int) $this->resolveArg('userId');
        $conversationId = (int) $this->resolveArg('conversationId');
        $messageText = (string) $this->resolveArg('message');
        $message = $this->repository->createMessage($userId, $conversationId, $messageText);

        $this->logger->info("Message `{$message->id}` of id `{$conversationId}` was viewed.");

        return $this->respondWithData($message);
    }
}
