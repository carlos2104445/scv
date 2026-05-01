import pexpect
import sys

# We spawn bash to pipe the file into ssh
child = pexpect.spawn('bash -c "ssh -o StrictHostKeyChecking=no root@82.25.101.6 \'bash -s\' < run_seed.sh"', encoding='utf-8')
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
