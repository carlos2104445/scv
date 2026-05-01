#!/bin/bash
cd /var/www/selam-admin/app/admin
npx dotenv-cli -e .env -- npx prisma db push
npx dotenv-cli -e .env -- npx tsx prisma/seed.ts
npx dotenv-cli -e .env -- npx tsx prisma/seed-content.ts
