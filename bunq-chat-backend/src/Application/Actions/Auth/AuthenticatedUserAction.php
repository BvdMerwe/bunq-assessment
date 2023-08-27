<?php

namespace App\Application\Actions\Auth;

use Psr\Http\Message\ResponseInterface as Response;

class AuthenticatedUserAction extends AuthAction
{
    protected function action(): Response
    {
        $userId = $this->authService->getAuthenticatedId($this->request);
        $user = $this->userRepository->getUserById($userId);
        return $this->respondWithData($user);
    }
}
