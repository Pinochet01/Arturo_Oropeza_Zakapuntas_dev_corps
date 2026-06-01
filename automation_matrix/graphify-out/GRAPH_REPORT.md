# Graph Report - automation_matrix  (2026-05-28)

## Corpus Check
- 7 files · ~3,877 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 62 nodes · 69 edges · 13 communities (7 shown, 6 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]

## God Nodes (most connected - your core abstractions)
1. `Reporte Ejecutivo — Automation Matrix` - 10 edges
2. `RegistroHandler` - 7 edges
3. `atomic_modify()` - 5 edges
4. `verify_pending()` - 4 edges
5. `Estado del Proyecto` - 4 edges
6. `list_utxos()` - 3 edges
7. `load_clientes()` - 3 edges
8. `Auditoría de Seguridad — Hallazgos Principales` - 3 edges
9. `_safe_cli()` - 2 edges
10. `verify_loop()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `verify_pending()` --calls--> `atomic_modify()`  [INFERRED]
  verificar_pagos.py → clientes_store.py
- `main()` --calls--> `httpServer`  [INFERRED]
  registrar_cliente.py → server.js

## Communities (13 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (9): app, crypto, express, fs, http, https, path, webhook2Server (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (5): atomic_modify(), load_clientes(), _write_clientes(), RegistroHandler, BaseHTTPRequestHandler

### Community 2 - "Community 2"
Cohesion: 0.7
Nodes (4): list_utxos(), _safe_cli(), verify_loop(), verify_pending()

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (4): Próximos Pasos (Priorizados), Reporte Ejecutivo — Automation Matrix, Resumen, Zrok Túneles — Tabla de Servicios

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (4): ✅ Completado, Estado del Proyecto, 📊 Métricas (Actualizadas), 🟡 Pendiente / Bloqueado

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (3): code:bash (# Permitir solo Chromebook (reemplazar 192.168.1.X)), Ejecutar con sudo para proteger el backend, Firewall Rules (requiere sudo)

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (3): Altos, Auditoría de Seguridad — Hallazgos Principales, Críticos

## Knowledge Gaps
- **22 isolated node(s):** `express`, `fs`, `https`, `http`, `path` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RegistroHandler` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `httpServer` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `atomic_modify()` (e.g. with `verify_pending()` and `._registrar()`) actually correct?**
  _`atomic_modify()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `express`, `fs`, `https` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._