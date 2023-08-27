<?php

namespace App\Infrastructure\Persistence\Conversation;

use App\Domain\Conversation\Conversation;
use Illuminate\Database\Eloquent\Model;

class ConversationModel extends Model
{
    protected $table = 'conversation';

    public int $id;
    public string $name;
    public array $members;
    public \DateTime $last_message_at;

    public function toModel(): Conversation
    {
        return new Conversation(
            $this->id,
            $this->name,
            $this->members,
            $this->last_message_at
        );
    }
}
