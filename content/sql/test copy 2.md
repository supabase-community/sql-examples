---
id: full-text-search
title: "Full Text Search"
description: How to use full text search in PostgreSQL.
author: zernonia
github: https://github.com/zernonia
---

Postgres has built-in functions to handle `Full Text Search` queries. This is like a "search engine" within Postgres.

```sql
create table books (
  id serial primary key,
  title text,
  author text,
  description text
);
```
