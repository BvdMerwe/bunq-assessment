<?php

namespace App\Infrastructure\Persistence\Message;

use App\Domain\Message\Message;
use App\Domain\User\User;
use App\Infrastructure\Persistence\Conversation\ConversationModel;
use App\Infrastructure\Persistence\User\UserModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MessageModel extends Model
{
    protected $table = 'message';
    protected $primaryKey = 'id';
    protected $fillable = ['text', 'sent_at'];
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserModel::class);
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(ConversationModel::class);
    }

    public function fromDomain(Message $domain): MessageModel
    {
        $this->id = $domain->getId();
        $this->text = $domain->getText();
        $this->user()->associate($domain->getUserId());
        $this->sent_at = $domain->getSentAt();
        return $this;
    }
    public function toDomain(): Message
    {
        return new Message(
            $this->id,
            $this->text,
            $this->user->id,
            new \DateTime($this->sent_at)
        );
    }
}
