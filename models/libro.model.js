import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from libros");
    return rows;
};

const postOne = async ({ id, nombre, autor, precio, stock }) => {
    const query = {
        text: "insert into libros (id, nombre,autor,precio,stock) values ($1,$2,$3,$4,$5) returning *",
        values: [id, nombre, autor, precio, stock],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const getOne = async (id) => {
    const query = {
        text: "select * from libros where id = $1",
        values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const deleteOne = async (id) => {
    const query = {
        text: "delete from libros where id = $1 returning *",
        values: [id],
    };

    await pool.query(query);

    return { msg: "registro eliminado" };
};

const updateOne = async (id, nombre, autor, precio, stock) => {
    const query = {
        text: "update libros set nombre = $1, autor = $2, precio = $3, stock = $4 where id = $5 returning *",
        values: [nombre, autor, precio, stock, id],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};

export const Book = {
    getAll,
    postOne,
    getOne,
    deleteOne,
    updateOne,
};
