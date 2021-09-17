---
title: "RLS Policies with joins"
description: Row level security that requires table joins .
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#policies-with-joins
---

Policies can even include table joins. This example shows how you can query "external" tables to build more advanced rules.

```sql
create table teams (
  id serial primary key,
  name text
);

-- 2. Create many to many join
create table members (
  team_id bigint references teams,
  user_id uuid references auth.users
);

-- 3. Enable RLS
alter table teams
  enable row level security;

-- 4. Create Policy
create policy "Team members can update team details if they belong to the team."
  on teams
  for update using (
    auth.uid() in (
      select user_id from members
      where team_id = id
    )
  );
```
