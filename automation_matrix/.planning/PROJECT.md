# Automation Matrix

## What This Is

Backend heavy-compute infrastructure for Delphos Marketing. Automated lead capture, crypto billing (Kaspa + Alephium), payment verification, admin dashboard, exposed via OpenZiti/zrok overlay network through a Chromebook gateway.

## Core Value

Fully automated marketing-to-payment pipeline with crypto-native billing, zero exposed ports, and encrypted overlay networking.

## Stack

Node.js, Express 5, Python 3, systemd, autossh, zrok (OpenZiti), WSL2, Kaspa mainnet, Alephium, Nym mixnet

## Architecture

```
Internet / Meta Webhooks → zrok.io (OpenZiti overlay)
    → Chromebook (Debian 13) [autossh + zrok tunnel]
        → Ryzen 7 3700 WSL2 [Express API :8080, Registrar :8081, Kaspa node, Nym proxy]
```

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| OpenZiti/zrok instead of VPN | Zero open ports, encrypted P2P, free | ✓ Good |
| Kaspa + Alephium dual crypto | Kaspa for UX, Alephium for contracts | ✓ Good |
| Chromebook as edge gateway | Always-on, low power, Debian native | ✓ Good |
| systemd user services | No root needed, auto-restart | ✓ Good |
| fcntl.flock atomic locking | Prevent TOCTOU race conditions | ✓ Good |

## Constraints

- No domain yet (zrok URL only)
- Self-signed SSL (Let's Encrypt pending)
- Kaspa node was testnet, needs mainnet sync
- Nym proxy needs real provider address

---

## Milestone: infrastructure-v1

**Focus:** Production-hardening — finish the 4 remaining infrastructure gaps
**Started:** 2026-05-24

---

*Last updated: 2026-05-24*
