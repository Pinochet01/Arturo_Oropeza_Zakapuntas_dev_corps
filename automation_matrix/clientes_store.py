import json
import os
import fcntl

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "clientes.json")
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)


def load_clientes():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return json.load(f)
    return {}


def _write_clientes(data):
    tmp = DATA_FILE + ".tmp"
    with open(tmp, "w") as f:
        json.dump(data, f, indent=2)
    os.replace(tmp, DATA_FILE)


def atomic_modify(mutator):
    lockfile = DATA_FILE + ".lock"
    fd = os.open(lockfile, os.O_CREAT | os.O_RDWR, 0o600)
    fcntl.flock(fd, fcntl.LOCK_EX)
    try:
        data = load_clientes()
        result = mutator(data)
        _write_clientes(data)
        return result
    finally:
        fcntl.flock(fd, fcntl.LOCK_UN)
        os.close(fd)
