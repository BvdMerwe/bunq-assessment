<?php

namespace App\Infrastructure\Persistence\Conversation;

use App\Domain\Conversation\Conversation;
use App\Domain\Conversation\ConversationRepository;
use App\Infrastructure\Persistence\User\UserModel;
use Exception;
use Illuminate\Database\Capsule\Manager;

class DatabaseConversationRepository implements ConversationRepository
{
    private Manager $manager;
    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @throws Exception
     */
    public function listConversations($userId): array
    {
        $query = ConversationModel::query()
            ->whereHas('members', function ($query) use ($userId) {
                $query->where('user.id', $userId);
            })->get();
        return $query->map(function (ConversationModel $model) {
            return $model->toDomain();
        })->toArray();
    }

    /**
     * @throws Exception
     */
    public function getConversationById(int $userId, int $conversationId): Conversation
    {
        $query = ConversationModel::query()
            ->where('id', $conversationId)
            ->whereHas('members', function ($query) use ($userId) {
                $query->where('user.id', $userId);
            })
            ->firstOrFail();
        return $query->toDomain();
    }

    public function createConversation(int $userId, array $userIds, string $name): Conversation
    {
        $allUsers = array_merge($userIds, [$userId]);
        // dont create duplicate conversations
        $existingConversation = ConversationModel::query()
            ->has('members', '=', count($allUsers))
            ->whereHas('members', function ($query) use ($allUsers) {
                $query->whereIn('user_id', $allUsers);
            })
            ->get();
        if ($existingConversation->count() > 0) {
            return $existingConversation->first()->toDomain();
        }

        $users = UserModel::query()->whereIn('id', $allUsers)->get();
        $conversation = new ConversationModel([
            'name' => $name,
        ]);
        $conversation->save();
        $conversation->members()->saveMany($users);
        return $conversation->toDomain();
    }
}
