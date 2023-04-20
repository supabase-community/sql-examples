---
title: "Seed unlimited users"
description: SQL seed function for table auth.users.
author: JOYBOY
github: https://github.com/JOYBOY-0
---

## How it works

This function generates as many users as you want for the table auth.users, given a value in:
```sql
FROM generate_series(1, 100)
```

It will create a user with email `{row}@gmail.com` and the passsword you pass to:
```sql
crypt('password123', gen_salt('bf'))
```

## Usefull for local development and testing

You can directly put the script into your `seed.sql` file if you're working locally, or run it with the SQL editor in the Supabase dashboard.
```sql
BEGIN;

WITH user_values AS (
  SELECT
    uuid_generate_v4() AS id,
    '00000000-0000-0000-0000-000000000000'::uuid AS instance_id,
    'authenticated' AS aud,
    'authenticated' AS role,
    (ROW_NUMBER() OVER ()) || '@gmail.com' AS email,
    crypt('password123', gen_salt('bf')) AS encrypted_password,
    now() AS email_confirmed_at,
    NULL::timestamp AS invited_at,
    '' AS confirmation_token,
    NULL::timestamp AS confirmation_sent_at,
    '' AS recovery_token,
    NULL::timestamp AS recovery_sent_at,
    '' AS email_change_token_new,
    '' AS email_change,
    NULL::timestamp AS email_change_sent_at,
    now()::timestamp AS last_sign_in_at,
    '{"provider":"email","providers":["email"]}'::jsonb AS raw_app_meta_data,
    '{}'::jsonb AS raw_user_meta_data,
    0::boolean AS is_super_admin,
    '2022-10-04 03:41:27.391146+00'::timestamp AS created_at,
    '2022-10-04 03:41:27.391146+00'::timestamp AS updated_at,
    NULL AS phone,
    NULL::timestamp AS phone_confirmed_at,
    '' AS phone_change,
    '' AS phone_change_token,
    NULL::timestamp AS phone_change_sent_at,
    '' AS email_change_token_current,
    0 AS email_change_confirm_status,
    NULL::timestamp AS banned_until,
    '' AS reauthentication_token,
    NULL::timestamp AS reauthentication_sent_at
  FROM generate_series(1, 100)
),
inserted_users AS (
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
)

SELECT * FROM user_values RETURNING id, instance_id
)

--(OPTINAL) Here you can inser the created users into another table

-- INSERT INTO public.user_profile (
--   id,
--   created_at,
--   username
-- )
-- SELECT
--   id,
--   now(),
--   'USUARIO' || ROW_NUMBER() OVER (),
-- FROM inserted_users;

COMMIT;
```

