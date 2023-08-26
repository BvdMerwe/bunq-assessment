<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use Psr\Http\Message\ResponseInterface as Response;
use Cake\Validation\Validator;

class RefreshAction extends AuthAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator
            ->requirePresence('refreshToken', 'You need to supply a refreshToken.')
            ->notEmptyString('refreshToken', 'You need to supply a password.');

        $errors = $validator->validate($this->getFormData() ?? []);
        if (!empty($errors)) {
            return $this->respondWithData($errors, 400);
        }

        try {
            $tokens = $this->authService->refreshToken($this->getFormData()['refreshToken']);
            return $this->respondWithData($tokens);
        } catch (\Throwable $th) {
            return $this->respondWithData($th->getMessage(), 401);
        }
    }
}
