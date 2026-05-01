import pexpect
import sys

child = pexpect.spawn('ssh -o StrictHostKeyChecking=no root@82.25.101.6 "cd /var/www/selam-admin/app/admin && export DATABASE_URL=\\$(grep DATABASE_URL ../../.env | cut -d \'=\' -f2- | tr -d \'\\"\') && npx tsx prisma/seed.ts && npx tsx prisma/seed-content.ts"', encoding='utf-8')
child.logfile = sys.stdout

try:
    i = child.expect(['[Pp]assword:', pexpect.EOF, pexpect.TIMEOUT], timeout=30)
    if i == 0:
        child.sendline('passQwerty@2dot.')
        child.expect(pexpect.EOF, timeout=120)
    elif i == 1:
        print("EOF")
    elif i == 2:
        print("TIMEOUT")
except Exception as e:
    print(str(e))
