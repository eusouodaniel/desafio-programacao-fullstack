\c "hubla_import_transactions";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "affiliates";
CREATE TABLE "public"."affiliates" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_5458bf988fb83086da3a14b9ff9" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "migrations";
DROP SEQUENCE IF EXISTS migrations_id_seq;
CREATE SEQUENCE migrations_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 8 CACHE 1;

CREATE TABLE "public"."migrations" (
    "id" integer DEFAULT nextval('migrations_id_seq') NOT NULL,
    "timestamp" bigint NOT NULL,
    "name" character varying NOT NULL,
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "migrations" ("id", "timestamp", "name") VALUES
(1,	1610584820929,	'Transaction1610584820929'),
(2,	1648303958251,	'TransactionType1648303958251'),
(3,	1648305787659,	'Affiliate1648305787659'),
(4,	1648305791950,	'Product1648305791950'),
(5,	1648305995779,	'AddAffiliateTransaction1648305995779'),
(6,	1648306001545,	'AddProductTransaction1648306001545'),
(7,	1648306905533,	'AddTransactionTypeToTransaction1648306905533'),
(8,	1648306915634,	'CreateUser1648306915634');

DROP TABLE IF EXISTS "products";
CREATE TABLE "public"."products" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "transaction_types";
CREATE TABLE "public"."transaction_types" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "type" integer NOT NULL,
    "description" character varying(30) NOT NULL,
    "kind" character varying(15) NOT NULL,
    "operation" character(1) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "transaction_types" ("id", "type", "description", "kind", "operation", "created_at", "updated_at") VALUES
('876eab8c-6c16-4256-ad5c-599559c3916c',	1,	'Venda produtor',	'Entrada',	'+',	'2022-03-29 17:47:25.283647',	'2022-03-29 17:47:25.283647'),
('24d3b293-a073-4c47-a96f-f7adab8fdc22',	2,	'Venda afiliado',	'Entrada',	'+',	'2022-03-29 17:47:25.283647',	'2022-03-29 17:47:25.283647'),
('029fcafe-dda2-4cc0-b1c0-fef54b22bce2',	3,	'Comissão paga',	'Saída',	'-',	'2022-03-29 17:47:25.283647',	'2022-03-29 17:47:25.283647'),
('7d971461-1520-4efd-a4f3-14a8025f046b',	4,	'Comissão recebida',	'Entrada',	'+',	'2022-03-29 17:47:25.283647',	'2022-03-29 17:47:25.283647');

DROP TABLE IF EXISTS "transactions";
CREATE TABLE "public"."transactions" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "transaction_date" timestamp NOT NULL,
    "price" numeric NOT NULL,
    "transaction_type_id" uuid NOT NULL,
    "affiliate_id" uuid NOT NULL,
    "product_id" uuid NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "typeorm_metadata";
CREATE TABLE "public"."typeorm_metadata" (
    "type" character varying NOT NULL,
    "database" character varying,
    "schema" character varying,
    "table" character varying,
    "name" character varying,
    "value" text
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "role" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "email", "password", "role", "created_at", "updated_at") VALUES
('8a2bb365-9d1f-4b7c-a378-3276eeea3d43',	'producer@hub.la',	'$2a$08$kZy6JedL79ITQXpkPLzmpuVMTtYvbzJmxQ3nWLWlfcZmTGuaOLNBW',	'PRODUCER',	'2022-03-29 17:47:25.340413',	'2022-03-29 17:47:25.340413');

ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "TransactionAffiliate" FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "TransactionProduct" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "TransactionTypeTransaction" FOREIGN KEY (transaction_type_id) REFERENCES transaction_types(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
