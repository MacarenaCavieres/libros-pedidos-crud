DROP TABLE IF EXISTS PEDIDOS;
DROP TABLE IF EXISTS LIBROS;

CREATE TABLE LIBROS (
	ID VARCHAR PRIMARY KEY,
	NOMBRE VARCHAR NOT NULL,
	AUTOR VARCHAR NOT NULL,
	PRECIO INT CHECK(PRECIO >= 0),
	STOCK INT CHECK(STOCK >= 0) DEFAULT 0
);

CREATE TABLE PEDIDOS (
	ID SERIAL PRIMARY KEY,
	CANTIDAD INT CHECK(CANTIDAD >= 0),
	LIBRO_ID VARCHAR NOT NULL,
	FOREIGN KEY (LIBRO_ID) REFERENCES LIBROS(ID) ON DELETE CASCADE
);

-- seeders
INSERT INTO LIBROS (ID, NOMBRE, AUTOR, PRECIO, STOCK) VALUES 
("46f1664e-da50-4984-b021-9693c4211e2a", "libro6", "autor6", 16000, 9),
("2cd652eb-ce65-4591-816c-094e0d769938", "libro7", "autor7", 17000, 9),
("e0fa1ccd-0c96-4ed0-a5ae-2a0f6bef0fe3", "libro1", "autor1", 15000, 12);

