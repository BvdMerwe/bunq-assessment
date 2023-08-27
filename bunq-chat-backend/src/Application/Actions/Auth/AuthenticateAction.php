<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use Cake\Validation\Validator;
use Psr\Http\Message\ResponseInterface as Response;

class AuthenticateAction extends AuthAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $validator = new Validator();
        $validator
            ->requirePresence('username', 'You need to supply a username.')
            ->notEmptyString('username', 'You need to supply a username.')
            ->requirePresence('password', 'You need to supply a password.')
            ->notEmptyString('password', 'You need to supply a password.');

        $errors = $validator->validate($this->getFormData());
        if (!empty($errors)) {
            $this->logger->warning("Invalid login attempt - input error");
            return $this->respondWithData($errors, 400);
        }
        $username = $this->getFormData()['username'];
        $password = $this->getFormData()['password'];
        $user = $this->userRepository->findUserByUsername($username);
        if ($user == null || !password_verify($password, $user->getPassword())) {
            $this->logger->warning("Invalid login attempt");
            return $this->respondWithData("Invalid Username or Password", 401);
        }

        $tokens = $this->authService->authenticate($user->getId());
        return $this->respondWithData($tokens);
    }
}
