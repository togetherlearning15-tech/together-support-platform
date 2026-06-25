create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  area text,
  city text,
  postcode text,
  status text default 'Available',
  property_type text,
  rooms text,
  suitable_for text,
  created_at timestamptz default now()
);

insert into properties (title,address,area,city,postcode,status,property_type,rooms,suitable_for)
values ('34 Milsom Street','34 Milsom Street, Easton, Bristol, BS5 0SS','Easton','Bristol','BS5 0SS','Available','Supported accommodation','Rooms available','Adults with housing-related support needs')
on conflict do nothing;

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_name text,
  organisation text,
  email text,
  telephone text,
  details text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists landlord_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text,
  telephone text,
  property_address text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);
