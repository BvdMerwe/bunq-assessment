<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\User\AuthAction;
use Psr\Http\Message\ResponseInterface as Response;

class AuthenticateAction extends AuthAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $users = $this->userRepository->findAll();

        $this->logger->info("Users list was viewed.");

        return $this->respondWithData($users);
    }
}
