---
title: "RLS Policies with security definer functions"
description: Row level security that make use of security definer functions .
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#policies-with-security-definer-functions
---

Policies can also make use of `security definer functions`. This is useful in a many-to-many relationship where you want to restrict access to the linking table. Following the `teams` and `members` example from above, this example shows how you can use security definer function in combination with a policy to control access to the members table.

```sql
-- 1. Follow example for 'Policies with joins' above

-- 2.  Enable RLS
alter table members
  enable row level security

-- 3.  Create security definer function
create or replace function get_teams_for_user(user_id uuid)
returns setof bigint as $$
    select team_id
    from members
    where user_id = $1
$$ stable language sql security definer;

-- 4. Create Policy
create policy "Team members can update team members if they belong to the team."
  on members
  for all using (
    team_id in (
      select get_teams_for_user(auth.uid())
    )
  );

```
