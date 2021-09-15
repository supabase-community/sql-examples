---
title: "Generate Youtube-like short ID"
description: Generate YouTube-like short IDs as Postgres Primary Keys.
author: zernonia
github: https://github.com/zernonia
reference:
  - https://github.com/turbo/pg-shortkey
---

## pg-shortkey

This installs a trigger and type which allow you to use YouTube-like short IDs (e.g. 1TNhBqYo-6Q) as Postgres Primary Keys. Just like the YouTube IDs, SHORTKEY IDs are fixed length and URL-safe.

```sql
create table test (id shortkey primary key, name text);
create trigger trigger_test_genid before insert on test for each row execute procedure shortkey_generate();

-- generate
insert into test(name) values ('bob'), ('joe');

-- user-supplied id
insert into test(id, name) values ('1tnhbqyo-6q', 'lisa');
select * from test;

-- id           name
-- 4e_z0mhjvrk  bob
-- wiz_j0hibuq  joe
-- 1tnhbqyo-6q  lisa
```

`shortkey` is compatible with `text` and should be handled as such by most sane ORMs. If not, create a type mapping to whatever your string type is in your app/ORM.

### Caveats

SHORTKEYs are truly random, so they fragment the index space just like v4 UUIDs, decreasing performance slightly. But unlike UUID (which provides an instance-local pseudo-sequential type via UUID v1 MC), that behavior can't be changed. This is intentional. SHORTKEYs are supposed to be used for external facing IDs, like in APIs.

There, they prevent enumeration and cardinality evaluation (e.g. how many things are there and what's the next/previous thing - just like YouTube). Use where appropriate.
