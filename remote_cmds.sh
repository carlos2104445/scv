
cd /var/www/selam-admin/app/admin
cat << 'EOF' > prisma.config.ts
import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
EOF
export DATABASE_URL=$(grep DATABASE_URL .env | cut -d '=' -f2- | tr -d '"')
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
npx tsx prisma/seed-content.ts
