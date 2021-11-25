---
title: "Query specific text from text[]"
description: Query rows that has specific text you need in a text array.
author: zernonia
github: https://github.com/zernonia
---

Assume we have column `categories` with type `text[]`, and we only want the rows with `swag` in the array. You could perform the operation as such:

```sql
select * from product where 'swag' % any(categories);
```

In fact, this query can be turned into Postgres Function so that you can query based on the input `category`.

```sql
create or replace function get_category (category text)  -- params: category
returns setof product
language plpgsql
as $$
begin
  return query
    select * from product where category % any(categories);
end; $$
```

If you are using [Supabase](https://supabase.com), you can use the function as such:

```js
const { data, error } = await supabase.rpc(
  "get_category", // name of the function
  { category: "swag" } // pass data into parameter
);
```
