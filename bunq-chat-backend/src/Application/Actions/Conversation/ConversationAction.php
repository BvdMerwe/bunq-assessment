<?php

declare(strict_types=1);

namespace App\Application\Actions\Conversation;

use App\Application\Actions\Action;
use App\Domain\Conversation\ConversationRepository;
use Psr\Log\LoggerInterface;

abstract class ConversationAction extends Action
{
    protected ConversationRepository $repository;

    public function __construct(LoggerInterface $logger, ConversationRepository $repository)
    {
        parent::__construct($logger);
        $this->repository = $repository;
    }
}
