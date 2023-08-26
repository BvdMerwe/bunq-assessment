<?php

declare(strict_types=1);

namespace App\Domain\Auth;

class Auth
{
    public function authenticate(string $username, string $password): bool
    {
        return true;
    }
    public function refreshToken(string $token): string
    {
        return "";
    }
}
