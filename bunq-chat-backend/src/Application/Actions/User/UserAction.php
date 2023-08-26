<?php

declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\AuthenticatedUser\AuthenticatedUserRepository;
use App\Domain\User\UserRepository;
use Psr\Log\LoggerInterface;

abstract class UserAction extends Action
{
    protected UserRepository $repository;

    public function __construct(LoggerInterface $logger, UserRepository $repository)
    {
        parent::__construct($logger);
        $this->repository = $repository;
    }
}
