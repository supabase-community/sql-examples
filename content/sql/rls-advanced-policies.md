---
title: "RLS Advanced policies"
description: Row level security with advanced/complicated policies.
author: supabase
github: https://github.com/supabase
reference:
  - https://supabase.io/docs/guides/auth#advanced-policies
---

1. Creates a table called `profiles` in the public schema (default schema).
2. Enables Row Level Security.
3. Creates a policy which allows logged in users to update their own data.

```sql
create table posts (
  id            serial    primary key,
  creator_id    uuid      not null     references auth.users(id),
  title         text      not null,
  body          text      not null,
  publish_date  date      not null     default now(),
  audience      uuid[]    null -- many to many table omitted for brevity
);

create table comments (
  id            serial    primary key,
  post_id       int       not null     references posts(id)  on delete cascade,
  user_id       uuid      not null     references auth.users(id),
  body          text      not null,
  comment_date  date      not null     default now()
);

create policy "Creator can see their own posts"
on posts
for select
using (
  auth.uid() = posts.creator_id
);

create policy "Logged in users can see the posts if they belong to the post 'audience'."
on posts
for select
using (
  auth.uid() = any (posts.audience)
);

create policy "Users can see all comments for posts they have access to."
on comments
for select
using (
  exists (
    select 1 from posts
    where posts.id = comments.post_id
  )
);
```
