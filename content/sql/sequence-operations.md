---
title: "Sequence operations"
description: Define a sequence generator.
author: cipherwizard9
github: https://github.com/cipherwizard9
---
## Create Sequence
Syntax to create a sequence generator in Postgres SQL. 
```sql
create [ temporary | temp ] sequence [ if not exists ] sequence_name [ increment [ by ] increment ]
    [ minvalue min_value | no minvalue ] [ maxvalue max_value | no maxvalue ]
    [ start [ with ] start_value ] [ cache cache ] [ [ no ] cycle ]
    [ owned by { table_name.column_name | none } ]

-- Example 1. Create a sequence starting from 1 and incremented by 1 with no maximum and minimum value
create sequence test_seq increment by 1 start with 1 no maxvalue no minvalue; -- test_seq is the sequence name

-- Example 2. Create a sequence starting from 100 and incremented by 10
create sequence test_seq increment by 10 start with 100; -- test_seq is the sequence name
```
## Next Value in Sequence
Fetch the next value of the sequence created.
```sql
select nextval('sequence_name');
-- Example
select nextval('test_seq'); -- test_seq is the sequence name
```

## Last Value or current value of the sequence

Query to fetch most recently obtained value from a sequence

```sql
select currval('sequence_name');
-- Example
select currval('test_seq') -- test_seq is the sequence name

select last_value from sequence_name;
-- Example
select last_value from test_sequence; -- test_seq is the sequence name
```

## Set Value of the sequence

Set the current value of the sequence to specific number within the range as defined at time of sequence generation.

```sql
select setval('sequence_number',value);
-- Example
select setval('test_seq',5)
```

## Drop Sequence

Drop the sequence.

```sql
drop sequence sequence_name;
-- Example
drop sequence test_seq; -- test_seq is the sequence name
```

