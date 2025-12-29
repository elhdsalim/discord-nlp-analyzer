# Discord Semantic Search (NLP Experiment)

I did this to experiment with NLP and data pipelines on a very concrete problem: **finding information inside long Discord discussions**.

On discord, channels can include thousands of messages and classic keyword search quickly becomes not very efficient. The goal here is to make those discussions searchable in a more *human* way, by meaning rather than exact words.

---

## Setup

### 1. Install dependencies

```
npm install
```

### 2. .env variables

Edit the `.env` file with your credentials:

```
DISCORD_TOKEN=your_discord_bot_token
CHANNEL_ID=your_channel_id
OPENAI_API_KEY=your_openai_api_key
```

---

## Usage

### Step 1 — Fetch Discord messages

```
npx tsx discord_fetcher/src/index.ts
```

This creates:

```
messages.ndjson
```

### Step 2 — Chunk conversations

```
npx tsx nlp/chunk.ts
```

This creates:

```
chunks.ndjson
```

### Step 3 — Create embeddings

```
npx tsx nlp/embed_chunks.ts
```

This creates:

```
chunk_embeddings.json
```

### Step 4 — Semantic search

```
npx tsx nlp/search_chunks.ts "your question here"
```

Example:

```
npx tsx nlp/search_chunks.ts "how to fix this bug"
```

The script prints the **most relevant chunks**, including timestamps and enough surrounding context to understand the discussion.


## Stack used
- TypeScript / Node.js
- Discord REST API
- OpenAI embeddings
- NDJSON for storage