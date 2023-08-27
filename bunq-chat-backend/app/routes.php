<?php

declare(strict_types=1);

use App\Application\Actions\Conversation\ConversationAction;
use App\Application\Actions\Conversation\CreateConversationAction;
use App\Application\Actions\Conversation\ListConversationAction;
use App\Application\Actions\Conversation\ViewConversationAction;
use App\Application\Actions\Message\CreateMessageAction;
use App\Application\Actions\Message\ListMessageAction;
use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Tuupola\Middleware\JwtAuthentication;
use App\Application\Actions\Auth\AuthenticateAction;
use App\Application\Actions\Auth\RefreshAction;
use App\Application\Actions\Auth\AuthenticatedUserAction;

return function (App $app) {
    $container = $app->getContainer();

    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });
    $app->group('/api', function (Group $group) use ($container) {
        $group->group('/auth', function (Group $group) use ($container) {
            $group->get('/me', AuthenticatedUserAction::class)
                ->addMiddleware($container->get(JwtAuthentication::class));
            $group->post('/login', AuthenticateAction::class);
            $group->post('/refresh', RefreshAction::class);
        });

        //Consider getting the user id from the token instead
        $group->group('/user', function (Group $group) {
            $group->get('', ListUsersAction::class);
            $group->get('/{userId}', ViewUserAction::class);
            $group->get('/{userId}/conversation', ListConversationAction::class);
            $group->post('/{userId}/conversation', CreateConversationAction::class);
            $group->get('/{userId}/conversation/{conversationId}', ViewConversationAction::class);
            $group->get('/{userId}/conversation/{conversationId}/message', ListMessageAction::class);
            $group->post('/{userId}/conversation/{conversationId}/message', CreateMessageAction::class);
        })->addMiddleware($container->get(JwtAuthentication::class));
    });

};
