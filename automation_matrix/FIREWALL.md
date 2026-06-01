# Firewall Rules (requiere sudo)
## Ejecutar con sudo para proteger el backend

```bash
# Permitir solo Chromebook (reemplazar 192.168.1.X)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 192.168.1.X to any port 8080 proto tcp  # Express HTTP
sudo ufw allow from 192.168.1.X to any port 8443 proto tcp  # Express HTTPS
sudo ufw allow from 192.168.1.X to any port 8081 proto tcp  # Registrar (LAN)
sudo ufw allow 22/tcp                                         # SSH
sudo ufw enable
```
