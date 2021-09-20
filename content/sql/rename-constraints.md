---
title: "Rename Constraints"
description: Template to rename any constraints you have.
author: PostgREST
github: https://github.com/PostgREST
---

Use the following SQL to rename any constraints you have on a table. 

Renaming constraints can be useful if you are trying to [embedding disambiguation](https://postgrest.org/en/v7.0.0/api.html#embedding-disambiguation). 

```sql
alter table orders
    rename constraint orders_billing_address_id_fkey  TO billing_address,
    rename constraint orders_shipping_address_id_fkey TO shipping_address;
```