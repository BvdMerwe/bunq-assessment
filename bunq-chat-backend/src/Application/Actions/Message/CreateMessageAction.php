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
            ->requirePresence('text');
        $errors = $validator->validate($this->request->getParsedBody());
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }

        $userId = (int) $this->resolveArg('userId');
        $conversationId = (int) $this->resolveArg('conversationId');
        $messageText = (string) $this->request->getParsedBody()['text'];
        $message = $this->repository->createMessage($userId, $conversationId, $messageText);

//        $this->logger->info("Message `{$message['id']}` of conversation `{$conversationId}` was creatad.");

        return $this->respondWithData($message);
    }
}
