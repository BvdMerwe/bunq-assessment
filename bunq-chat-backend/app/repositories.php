<?php

declare(strict_types=1);

use App\Domain\AuthenticatedUser\AuthenticatedUserRepository;
use App\Domain\Conversation\ConversationRepository;
use App\Domain\Message\MessageRepository;
use App\Infrastructure\Persistence\AuthenticatedUser\InMemoryAuthenticatedUserRepository;
use App\Infrastructure\Persistence\User\DatabaseUserRepository;
use App\Infrastructure\Remote\Conversation\RemoteConversationRepository;
use App\Infrastructure\Remote\Message\RemoteMessageRepository;
use DI\ContainerBuilder;
use App\Domain\User\UserRepository;
use App\Infrastructure\Remote\User\RemoteUserRepository;

return function (ContainerBuilder $containerBuilder) {
    // Here we map our UserRepository interface to its in memory implementation
    $containerBuilder->addDefinitions([
        AuthenticatedUserRepository::class => \DI\autowire(InMemoryAuthenticatedUserRepository::class),
        UserRepository::class => \DI\autowire(DatabaseUserRepository::class),
        ConversationRepository::class => \DI\autowire(RemoteConversationRepository::class),
        MessageRepository::class => \DI\autowire(RemoteMessageRepository::class),
    ]);
};
