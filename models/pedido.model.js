import { pool } from "../database/connection.js";

const postOne = async (cantidad, libro_id) => {
    try {
        await pool.query("begin");

        const query1 = {
            text: "update libros set stock = stock - $1 where id = $2 ",
            values: [cantidad, libro_id],
        };

        await pool.query(query1);

        const query2 = {
            text: "insert into pedidos (cantidad,libro_id) values ($1,$2) returning *",
            values: [cantidad, libro_id],
        };

        const { rows } = await pool.query(query2);

        await pool.query("commit");

        return rows[0];
    } catch (error) {
        console.error("Error en pedido.model ===> ", error);
        await pool.query("rollback");
        throw error;
    }
};

export const Order = {
    postOne,
};
