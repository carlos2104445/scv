import pexpect
import sys

cmds = """
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
"""

with open('remote_cmds.sh', 'w') as f:
    f.write(cmds)

child = pexpect.spawn('scp -o StrictHostKeyChecking=no remote_cmds.sh root@82.25.101.6:/var/www/selam-admin/app/admin/', encoding='utf-8')
try:
    i = child.expect(['[Pp]assword:'], timeout=30)
    if i == 0:
        child.sendline('passQwerty@2dot.')
        child.expect(pexpect.EOF, timeout=30)
except Exception as e:
    pass

import time
time.sleep(1)

child2 = pexpect.spawn('ssh -o StrictHostKeyChecking=no root@82.25.101.6 "cd /var/www/selam-admin/app/admin && bash remote_cmds.sh"', encoding='utf-8')
child2.logfile = sys.stdout

try:
    i = child2.expect(['[Pp]assword:', pexpect.EOF, pexpect.TIMEOUT], timeout=30)
    if i == 0:
        child2.sendline('passQwerty@2dot.')
        child2.expect(pexpect.EOF, timeout=120)
except Exception as e:
    pass
