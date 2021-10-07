---
title: Basic Aggregrate Functions
description: Set of functions to perform calculation on a set of values. The return is a single summary value. (Except for "round()")
author: lucasmrl
github: https://github.com/lucasmrl/
---

## Basic Aggregate Functions

`max()`
```sql
select max(column_name)
from table_name;
```

`min()`
```sql
select min(column_name)
from table_name;
```

`avg()`
```sql
select avg(column_name)
from table_name;
```

`sum()`
```sql
select sum(column_name)
from table_name;
```

`count()` - Number of rows where the value is not `NULL`
```sql
select count(column_name)
from table_name;
```

`round()` -  Parameter `integer` specifies the number of decimal places to round the value. All values on "column_name" will be rounded)
```sql
select round(column_name, integer)
from table_name;
```
