---
title: "RLS Edit Policy"
description: Row level security editing.
author: PaulRosset
github: https://github.com/PaulRosset
reference:
  - https://supabase.io/docs/guides/auth#advanced-policies
---

1. Rename a RLS policy.
2. Edit an existing policy.

```sql
-- 1. Edit policy name
alter policy name on table_name rename to new_name

-- 2. Edit an existing policy
alter policy name on table_name
    using (
        auth.uid() = id
    )

alter policy name on table_name
    with check (
        auth.uid() = id
    )
```
