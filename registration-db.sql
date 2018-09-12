drop table if exists registration_table;

create table registration_table(
    id serial not null primary key,
    regcode text not null
);

-- insert into registration_table(regcode) values ('$1')