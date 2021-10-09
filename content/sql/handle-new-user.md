---
title: "Handle New User - Function & Trigger"
description: Insert new user data into another table when event new user signup using Supabase Auth.
author: zernonia
github: https://github.com/zernonia
---

First, create a function `handle_new_user` that return a `trigger`, and save the desired data into `profiles` table.  

```sql
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, avatar_url, full_name)
  values (new.id, new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
```

Now, we will create a trigger `on_auth_user_created` that utilized the function above. It triggers when a new row is insert into `auth.users` table (when new User Signup).

```sql
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
