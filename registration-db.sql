drop table if exists registration_table;

create table registration_table(
    id serial not null primary key,
    regcode text not null unique,
    locationarea text not null unique
);

insert into registration_table(regcode, locationarea) values ('$1', '$2');
