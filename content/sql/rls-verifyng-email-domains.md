---
title: "RLS Verifying email domains"
description: Row level security that verify email domains.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#verifying-email-domains
---

Postgres has a function `right(string, n)` that returns the rightmost n characters of a string. You could use this to match staff member's email domains.

```sql
-- 1. Create table
create table leaderboard (
  id uuid references auth.users,
  high_score bigint
);

-- 2. Enable RLS
alter table leaderboard
  enable row level security;

-- 3. Create Policy
create policy "Only Blizzard staff can update leaderboard"
  on leaderboard
  for update using (
    right(auth.email(), 13) = '@blizzard.com'
  );
```
