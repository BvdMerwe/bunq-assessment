<?php

namespace App\Infrastructure\Persistence\Message;

use App\Domain\Message\Message;
use App\Domain\Message\MessageRepository;
use App\Infrastructure\ApiClient\GuzzleApiClient;
use App\Infrastructure\Persistence\Conversation\ConversationModel;
use App\Infrastructure\Persistence\User\UserModel;
use Illuminate\Database\Capsule\Manager;

class DatabaseMessageRepository implements MessageRepository
{
    private Manager $dbmanager;
    public function __construct(Manager $manager)
    {
        $this->dbmanager = $manager;
    }
    public function listMessages(int $userId, int $conversationId): array
    {
//        $user = UserModel::query()->find($userId);
        $conversation = ConversationModel::query()
            ->whereHas('members', function ($query) use ($userId) {
                $query->where('user.id', $userId);
            })
            ->find($conversationId);
        $messages = MessageModel::query()
            ->where('conversation_id', $conversationId)
            ->whereBelongsTo($conversation, 'conversation')
            ->orderBy('sent_at', 'desc')
            ->get();
        return $messages->map(function (MessageModel $model) {
            return $model->toDomain();
        })->toArray();
    }

    public function createMessage(int $userId, int $conversationId, string $message): Message
    {
        $messageModel = new MessageModel();
        $messageModel->user()->associate($userId);
        $messageModel->conversation()->associate($conversationId);
        $messageModel->text = $message;
//        $messageModel->sent_at = new \DateTime('now');
        $messageModel->save();
        return $messageModel->toDomain();
    }
}