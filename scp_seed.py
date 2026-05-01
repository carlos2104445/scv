import pexpect
import sys

# SCP schema and seed files to remote server
child = pexpect.spawn('scp -o StrictHostKeyChecking=no admin/prisma/schema.prisma root@82.25.101.6:/var/www/selam-admin/app/admin/prisma/', encoding='utf-8')
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
