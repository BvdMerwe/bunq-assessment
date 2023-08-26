<?php

declare(strict_types=1);

namespace Tests\Infrastructure\Persistence\User;

use App\Domain\AuthenticatedUser\AuthenticatedUser;
use App\Domain\AuthenticatedUser\UserNotFoundException;
use App\Infrastructure\Persistence\AuthenticatedUser\InMemoryAuthenticatedUserRepository;
use Tests\TestCase;

class InMemoryUserRepositoryTest extends TestCase
{
    public function testFindAll()
    {
        $user = new AuthenticatedUser(1, 'bill.gates', 'Bill', 'Gates');

        $userRepository = new InMemoryAuthenticatedUserRepository([1 => $user]);

        $this->assertEquals([$user], $userRepository->findAll());
    }

    public function testFindAllUsersByDefault()
    {
        $users = [
            1 => new AuthenticatedUser(1, 'bill.gates', 'Bill', 'Gates'),
            2 => new AuthenticatedUser(2, 'steve.jobs', 'Steve', 'Jobs'),
            3 => new AuthenticatedUser(3, 'mark.zuckerberg', 'Mark', 'Zuckerberg'),
            4 => new AuthenticatedUser(4, 'evan.spiegel', 'Evan', 'Spiegel'),
            5 => new AuthenticatedUser(5, 'jack.dorsey', 'Jack', 'Dorsey'),
        ];

        $userRepository = new InMemoryAuthenticatedUserRepository();

        $this->assertEquals(array_values($users), $userRepository->findAll());
    }

    public function testFindUserOfId()
    {
        $user = new AuthenticatedUser(1, 'bill.gates', 'Bill', 'Gates');

        $userRepository = new InMemoryAuthenticatedUserRepository([1 => $user]);

        $this->assertEquals($user, $userRepository->findUserOfId(1));
    }

    public function testFindUserOfIdThrowsNotFoundException()
    {
        $userRepository = new InMemoryAuthenticatedUserRepository([]);
        $this->expectException(UserNotFoundException::class);
        $userRepository->findUserOfId(1);
    }
}
