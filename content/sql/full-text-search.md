---
title: "Full Text Search"
description: How to use full text search in PostgreSQL.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/database/full-text-search
---

Postgres has built-in functions to handle `Full Text Search` queries. This is like a "search engine" within Postgres.

For example, if we have the table books created by the next sql:

```sql
create table books (
  id serial primary key,
  title text,
  author text,
  description text
);
```

The query that can be used to find all the books with the word "supabase" in the "description" column is:

```sql
select * from books
  where
    to_tsvector(description)
    @@ to_tsquery('big');

```
