---
title: "RLS Read Access"
description: Row level security for read access.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#allow-read-access
---

1. Creates a table called `profiles` in the public schema (default schema).
2. Enables Row Level Security.
3. Creates a policy which allows all `select` queries to run.

```sql
-- 1. Create table
create table profiles (
  id uuid references auth.users,
  avatar_url text
);

-- 2. Enable RLS
alter table profiles
  enable row level security;

-- 3. Create Policy
create policy "Public profiles are viewable by everyone."
  on profiles for select using (
    true
  );
```
