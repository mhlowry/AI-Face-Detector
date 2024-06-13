BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Test', Test@test.com, 5, '2024-01-01')
INSERT into login (hash, email) values ($2a$10$S2/5LUYMk0v3c9RvaAnnJexwbzPMl8Yz02fXEkD6.W3Pc1B8iGnte, Test@test.com)

COMMIT;