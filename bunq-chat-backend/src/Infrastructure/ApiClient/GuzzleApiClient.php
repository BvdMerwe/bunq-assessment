<?php

namespace App\Infrastructure\ApiClient;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class GuzzleApiClient
{
    private Client $client;
    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = '';
        $this->client = new Client([
            'base_uri' => 'https://assignment.bunq.com',
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $this->apiKey,
            ],
        ]);
    }

    /**
     * @throws GuzzleException
     */
    public function get(string $url): array
    {
        $response = $this->client->get($url);
        $body = $response->getBody()->getContents();
        return json_decode($body, true);
    }

    /**
     * @throws GuzzleException
     */
    public function post(string $url, array $data): array
    {
        $response = $this->client->post($url, [
            'json' => $data,
        ]);
        $body = $response->getBody()->getContents();
        return json_decode($body, true);
    }
}
