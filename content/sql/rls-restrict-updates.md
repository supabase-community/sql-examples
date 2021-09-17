---
title: "RLS Restrict updates"
description: Row level security for restrict updates.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#restrict-updates
---

1. Creates a table called `profiles` in the public schema (default schema).
2. Enables Row Level Security.
3. Creates a policy which allows logged in users to update their own data.

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
create policy "Users can update their own profiles."
  on profiles for update using (
    auth.uid() = id
  );
```
