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
            ->requirePresence('user_ids');
        $formData = $this->getFormData();
        $errors = $validator->validate($formData ?? []);
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }
        $userId = (int) $this->resolveArg('userId');
        $userIds = $formData['user_ids'];
        $name = $formData['name'] ?? '';
        $conversations = $this->repository
            ->createConversation($userId, $userIds, $name);

        $this->logger->info("Conversation was created.");

        return $this->respondWithData($conversations);
    }
}
