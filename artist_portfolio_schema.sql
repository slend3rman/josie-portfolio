-- SQL for paintings catalog
drop table if exists paintings;
create table paintings (
  id integer primary key autoincrement,
  name text not null,
  image_url text not null,
  price real not null,
  available boolean not null default 1
);

insert into paintings (name, image_url, price, available) values
('Sunset Over Lake', '/images/painting1.png', 120.00, 1),
('Abstract Dreams', '/images/painting2.png', 95.00, 1),
('Floral Harmony', '/images/painting3.png', 150.00, 0);

-- SQL for requests table
drop table if exists requests;
create table requests (
  id integer primary key autoincrement,
  name text not null,
  email text not null,
  insta_handle text,
  description text not null,
  image_url text
);
