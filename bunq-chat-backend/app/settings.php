<?php

declare(strict_types=1);

use App\Application\Settings\Settings;
use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Logger;

return function (ContainerBuilder $containerBuilder) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
    // Global Settings Object
    $containerBuilder->addDefinitions([
        SettingsInterface::class => function () {
            return new Settings([
                'displayErrorDetails' => true, // Should be set to false in production
                'logError'            => false,
                'logErrorDetails'     => false,
                'logger' => [
                    'name' => 'slim-app',
                    'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
                    'level' => Logger::DEBUG,
                ],
                'jwt_authentication' => [
                    'secret' => $_ENV['JWT_SECRET'],
                    'algorithm' => 'HS256',
                    'secure' => false, // only for localhost for prod and test env set true
                    'error' => static function ($response, $arguments) {
                        $data['status'] = 401;
                        $data['error'] = 'Unauthorized/' . $arguments['message'];
                        $data['message'] = 'Unauthorized/' . $arguments['message'];
                        return $response
                            ->withHeader('Content-Type', 'application/json;charset=utf-8')
                            ->getBody()->write(json_encode(
                                $data,
                                JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
                            ));
                    }
                ],
            ]);
        }
    ]);
};
