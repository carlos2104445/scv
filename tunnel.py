import pexpect
import sys
import time

child = pexpect.spawn('ssh -o StrictHostKeyChecking=no -L 5433:localhost:5432 root@82.25.101.6 -N', encoding='utf-8')
child.logfile = sys.stdout

try:
    i = child.expect(['[Pp]assword:', pexpect.EOF, pexpect.TIMEOUT], timeout=30)
    if i == 0:
        child.sendline('passQwerty@2dot.')
        time.sleep(5)  # give it some time to establish the tunnel
        print("Tunnel established!")
    elif i == 1:
        print("EOF")
    elif i == 2:
        print("TIMEOUT")
except Exception as e:
    print(str(e))

while True:
    time.sleep(1)
