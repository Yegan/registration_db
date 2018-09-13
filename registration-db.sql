drop table if exists registration_table;

create table registration_table(
    id serial not null primary key,
    regcode text
);

drop table if exists towns_table;

create table towns_table(
    id serial not null primary key,
    loca text not null,
    area text not null
);

-- insert into registration_table(regcode) values ('$1')