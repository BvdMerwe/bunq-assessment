<?php

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use App\Infrastructure\Persistence\Message\MessageModel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserModel extends Model
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = ['name'];
    protected $hidden = ['password', 'pivot'];
    protected $attributes = [
        'last_seen' => null,
    ];
    public $timestamps = false;

    public function fromDomain(User $user): UserModel
    {
        $this->id = $user->getId();
        $this->name = $user->getName();
        return $this;
    }
    public function toDomain(): User
    {
        $lastSeen = $this->last_seen();
        return new User(
            $this->id,
            $this->name,
            $lastSeen,
            $this->password
        );
    }

    public function messages(): HasMany
    {
        return $this->hasMany(MessageModel::class, 'user_id', 'id');
    }

    public function last_seen(): ?\DateTime
    {
        $latestMessage = $this->messages()->latest()->first();
        if ($latestMessage) {
            return new \DateTime($latestMessage->sent_at);
        }
        return null;
    }
}
