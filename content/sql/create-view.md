---
title: "Create View"
description: Basic view template. Change according to your preference.
author: zernonia
github: https://github.com/zernonia
---

Views allow you to encapsulate the details of the structure of your tables.

Simple `view` usage:

```sql
create or replace view user_view
  as select name, email from user
```

More usage: Joint table using `view`

```sql
create or replace view my_view
  as select name, date, location
    from weather, cities
    where city == name
```
