drop table if exists towns_table, registration_table cascade;

create table towns_table(
    id serial not null primary key,
    loca text not null,
    area text not null
);

create table registration_table(
    id serial not null primary key,
    regcode text,
    code_id int not null,
    foreign key(code_id) references towns_table(id)
);


-- insert into registration_table(regcode) values ('$1')

insert into towns_table(loca, area) values('Bellville', 'CY')