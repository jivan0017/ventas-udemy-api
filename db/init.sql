-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE ventasdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ventasdb')\gexec