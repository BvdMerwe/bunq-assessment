<?php

namespace App\Application\Actions\Auth;

use Psr\Http\Message\ResponseInterface as Response;

class AuthenticatedUserAction extends AuthAction
{
    protected function action(): Response
    {
        $userId = $this->authService->getAuthenticatedId($this->request);
        $user = $this->userRepository->findUserOfId($userId);
        return $this->respondWithData($user);
    }
}
