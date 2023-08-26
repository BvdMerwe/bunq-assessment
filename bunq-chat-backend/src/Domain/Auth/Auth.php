<?php

declare(strict_types=1);

namespace App\Domain\Auth;

use DateTime;
use Firebase\JWT\JWT;
use Psr\Http\Message\RequestInterface as Request;

class Auth
{
    public function getAuthenticatedId(Request $request): int
    {
        $authHeader = $request->getHeader('Authorization')[0];
        $token = explode(" ", $authHeader)[1];
        $secret = $_ENV["JWT_SECRET"];
        $decoded = JWT::decode($token, $secret, ["HS256"]);
        return $decoded->sub;
    }
    public function authenticate(int $userId): AuthResponse
    {
        return $this->generateKeys($userId);
    }

    /**
     * @throws \Exception
     */
    public function refreshToken(string $token): AuthResponse
    {
        $secret = $_ENV["JWT_SECRET"];
        $decoded = JWT::decode($token, $secret, ["HS256"]);
        $userId = $decoded->sub;
        $scope = $decoded->scope ?? null;
        $now = new DateTime('now');
        $expiry = new DateTime("@$decoded->exp");

        if ($scope !== "refresh") {
            throw new \Exception("Invalid scope");
        }

        if ($expiry < $now) {
            throw new \Exception("Token has expired");
        }
        return $this->generateKeys($userId);
    }

    private function generateKeys(int $userId): AuthResponse
    {
        $now = new DateTime();
        $future = new DateTime("now +2 hours");
        $farFuture = new DateTime("now +14 days");

        $jti = base64_encode(random_bytes(16));

        $accessTokenData = [
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "jti" => $jti,
            "sub" => $userId,
            "source" => $_ENV["BASE_URL"],
        ];
        $refreshTokenData = [
            "iat" => $now->getTimeStamp(),
            "exp" => $farFuture->getTimeStamp(),
            "jti" => $jti,
            "sub" => $userId,
            "scope" => "refresh",
            "source" => $_ENV["BASE_URL"],
        ];

        $secret = $_ENV["JWT_SECRET"];
        $token = JWT::encode($accessTokenData, $secret);
        $refreshToken = JWT::encode($refreshTokenData, $secret);

        return new AuthResponse($token, $refreshToken);
    }
}
