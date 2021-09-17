---
title: "RLS Time to live for rows"
description: Row level security policies to implement TTL.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#verifying-email-domains
---

Policies can also be used to implement TTL or time to live feature that you see in Instagram stories or Snapchat. In the following example, rows of `stories` table are available only if they have been created within the last 24 hours.

```sql
-- 1. Create table
create table if not exists stories (
  id uuid not null primary key DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  content text not null
);

-- 2. Enable RLS
alter table stories
  enable row level security;

-- 3. Create Policy
create policy "Stories are live for a day"
  on stories
  for select using (
    created_at > (current_timestamp - interval '1 day')
  );
```
