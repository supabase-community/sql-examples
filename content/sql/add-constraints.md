---
title: "Add Constraint"
description: Template for adding a constraint.
author: zernonia
github: https://github.com/zernonia
---

List of commonly used constraints:

- `not null` − Ensures that a column cannot have NULL value.
- `unique` − Ensures that all values in a column are different.
- `primary key` − Uniquely identifies each row/record in a database table.
- `foreign key` − Constrains data based on columns in other tables.
- `check` − The CHECK constraint ensures that all values in a column satisfy certain conditions.
- `exclusion` − The EXCLUDE constraint ensures that if any two rows are compared on the specified column(s) or expression(s) using the specified operator(s), not all of these comparisons will return TRUE.

```sql
alter table table_name
  add constraint constraint_name check (constraint_name > 0);
```
