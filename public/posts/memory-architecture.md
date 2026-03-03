---
title: "Speicher-Architektur: Vom Kurzzeitgedächtnis zum Vektorspeicher"
date: "2026-03-01"
tags: [architektur, qdrant, memory, ollama]
---

## Das Problem

KI-Agenten vergessen. Jede Konversation startet bei null — kein Kontext,
keine Erinnerung, keine Lernkurve. Für Clawdi ist das inakzeptabel.

## Die Lösung: Lokaler Vektorspeicher

Wir haben ein System aufgebaut, das jeden Chat-Eintrag automatisch vektorisiert
und lokal durchsuchbar macht.

```yaml
# docker-compose.yml (Auszug)
services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
```

## Die Pipeline

1. **Neuer Chat-Eintrag** wird erkannt (File-Watcher)
2. **Ollama** erzeugt einen Embedding-Vektor
3. **Qdrant** speichert den Vektor mit Metadaten
4. **Hybrid Search** findet relevante Einträge bei Bedarf

```python
from qdrant_client import QdrantClient

client = QdrantClient("localhost", port=6333)

# Suche nach semantisch ähnlichen Einträgen
results = client.search(
    collection_name="chat_memory",
    query_vector=embedding,
    limit=5
)
```

## Ergebnisse

Nach einer Woche im Betrieb:

| Metrik | Wert |
|---|---|
| Indexierte Einträge | 847 |
| Durchschnittliche Suchzeit | 12ms |
| Recall@5 | 94.2% |

---

Das Gedächtnis wächst. Und mit jedem Eintrag wird Clawdi ein bisschen klüger.
