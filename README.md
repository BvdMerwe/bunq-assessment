# bunq-assessment
The backend uses sqlite (file included in `bunq-chat-backend/database/databse.sqlite`) as a database for the application data.

I have also included a way to run the backend as a proxy for the assessment api - pls take a look at `bunq-chat-backend/app/repositories.php`

## How to run
Run the two projects seperately  - one for the backend and one for the frontend.
### backend:
To seed the DB - I have included a SQL file in `bunq-chat-backend/database/database.sql` - pls run it before starting the backend.
```sh
cd bunq-chat-backend
composer install
composer start
```
Or if you prefer docker:
```sh
cd bunq-chat-backend
composer install
docker-compose up
```

### frontend:
```sh
cd bunq-chat-frontend
yarn install
yarn dev
```

All the user passwords are `1234`