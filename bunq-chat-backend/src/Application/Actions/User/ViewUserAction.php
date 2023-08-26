<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class ViewUserAction extends UserAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator->requirePresence('userId');
        $errors = $validator->validate($this->request->getAttributes());
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }

        $userId = (int) $this->resolveArg('userId');
        $user = $this->repository->getUserById($userId);

        $this->logger->info("User of id `{$userId}` was viewed.");

        return $this->respondWithData($user);
    }
}
