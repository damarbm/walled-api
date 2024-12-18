-- TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions
(
    id bigint NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    amount integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer,
    date timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT recipient_id FOREIGN KEY (recipient_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT transactions_sender_id_fkey FOREIGN KEY (sender_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    avatar_url text COLLATE pg_catalog."default" NOT NULL,
    balance bigint NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
        INCLUDE(email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;