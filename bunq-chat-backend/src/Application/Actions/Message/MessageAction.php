<?php

declare(strict_types=1);

namespace App\Application\Actions\Message;

use App\Application\Actions\Action;
use App\Domain\Conversation\ConversationRepository;
use App\Domain\Message\MessageRepository;
use Psr\Log\LoggerInterface;

abstract class MessageAction extends Action
{
    protected MessageRepository $repository;

    public function __construct(LoggerInterface $logger, MessageRepository $repository)
    {
        parent::__construct($logger);
        $this->repository = $repository;
    }
}
