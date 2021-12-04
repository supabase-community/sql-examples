---
title: "Case Expression"
description: Case Expression.
author: PaulRosset
github: https://github.com/PaulRosset
---

1. Create a table film.
2. Perform a select operation with conditional case expression.

```sql
-- 1. Create table
create table film (
  title text,
  length decimal,
);

-- 2. Select with case expression
select title,
       length,
       CASE
           WHEN length > 0
                AND length <= 50 THEN 'Short'
           WHEN length > 50
                AND length <= 120 THEN 'Medium'
           WHEN length> 120 THEN 'Long'
       END duration
FROM film
ORDER BY title;
```
