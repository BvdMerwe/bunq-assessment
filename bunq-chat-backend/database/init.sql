CREATE TABLE user
(
    id       INTEGER PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE conversation
(
    id   INTEGER PRIMARY KEY,
    name VARCHAR(255) DEFAULT NULL
);

CREATE TABLE user_conversation
(
    user_id         INTEGER NOT NULL,
    conversation_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (conversation_id) REFERENCES conversation (id)
);

CREATE TABLE message
(
    id              INTEGER PRIMARY KEY,
    user_id         INTEGER      NOT NULL,
    conversation_id INTEGER      NOT NULL,
    text            VARCHAR(255) NOT NULL,
    sent_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (conversation_id) REFERENCES user (id)
);

INSERT INTO user (name, password)
VALUES ('ali', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('andre', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('bram', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('hilco', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('jesper', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('jordy', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('mdemaa', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('nick', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');
INSERT INTO user (name, password)
VALUES ('wessel', '$2a$12$yDLl7pJAkr9VvbFgnfRLjeBCzzYVBMxElHJvwyf2G3KsyMkmf0R2.');