create table admin
(
    id       serial
        constraint "PK_e032310bcef831fb83101899b10"
            primary key,
    username varchar(80) not null,
    password varchar(80) not null,
    email    varchar,
    phone    varchar,
    role     varchar
);

create table application
(
    id          serial
        constraint "PK_569e0c3e863ebdf5f2408ee1670"
            primary key,
    "appId"     varchar(80)             not null,
    name        varchar(80)             not null,
    type        application_type_enum   not null,
    description text,
    "createAt"  timestamp default now(),
    "updateAt"  timestamp,
    "isDelete"  boolean   default false not null,
    "userId"    integer                 not null
        constraint "FK_b4ae3fea4a24b4be1a86dacf8a2"
            references admin
);

