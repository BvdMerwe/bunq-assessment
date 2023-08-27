<?php

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'last_seen', 'password'];

    public function fromDomain(User $user): UserModel
    {
        $this->id = $user->getId();
        $this->name = $user->getName();
        $this->last_seen = $user->getLastSeen();
        return $this;
    }
    public function toDomain(): User
    {
//        print_r($this);
        return new User(
            $this->id,
            $this->name,
            new \DateTime($this->last_seen),
            $this->password
        );
    }
}
