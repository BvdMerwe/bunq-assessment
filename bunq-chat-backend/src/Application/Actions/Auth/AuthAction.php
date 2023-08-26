<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use App\Domain\Auth\Auth;
use App\Domain\AuthenticatedUser\AuthenticatedUserRepository;
use Psr\Log\LoggerInterface;

abstract class AuthAction extends Action
{
    protected AuthenticatedUserRepository $userRepository;
    protected Auth $authService;

    public function __construct(LoggerInterface $logger, AuthenticatedUserRepository $userRepository, Auth $authService,)
    {
        parent::__construct($logger);
        $this->userRepository = $userRepository;
        $this->authService = $authService;
    }
}
