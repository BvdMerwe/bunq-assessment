<?php

namespace App\Infrastructure\Persistence\Conversation;

use App\Domain\Conversation\Conversation;
use App\Infrastructure\Persistence\Message\MessageModel;
use App\Infrastructure\Persistence\User\UserModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ConversationModel extends Model
{
    protected $table = 'conversation';
    protected $fillable = ['name'];
    protected $primaryKey = 'id';
    public $timestamps = false;


    public function members(): BelongsToMany
    {
        return $this->belongsToMany(
            UserModel::class,
            'user_conversation',
            'user_id',
            'conversation_id',
        );
    }

    public function messages(): HasMany
    {
        return $this->hasMany(MessageModel::class);
    }

    public function lastMessage(): HasOne
    {
        return $this->hasOne(MessageModel::class, 'conversation_id', 'id')->latest();
    }

    public function toDomain(): Conversation
    {
        return new Conversation(
            $this->id,
            $this->name,
            $this->members->map(function (UserModel $model) {
                return $model->toDomain();
            })->toArray(),
            isset($this->lastMessage) ? $this->lastMessage->toDomain() : null,
        );
    }
    public function fromDomain(Conversation $conversation): ConversationModel
    {
        $this->id = $conversation->getId();
        $this->name = $conversation->getName();
        $this->members = $conversation->getMembers();
        $this->last_message = $conversation->getLastMessage();
    }
}
