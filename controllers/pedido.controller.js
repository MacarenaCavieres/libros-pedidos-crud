import { Order } from "../models/pedido.model.js";
import { handleErrors } from "../database/errors.js";

const postOneOrder = async (req, res) => {
    try {
        const { cantidad, libro_id } = req.body;

        const data = await Order.postOne(cantidad, libro_id);

        return res.status(201).json(data);
    } catch (error) {
        console.error("error===> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json(msg);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const data = await Order.getAll();

        if (data.length === 0) return res.status(200).json({ ok: true, msg: "No hay registros" });

        return res.json(data);
    } catch (error) {
        console.error("error===> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json(msg);
    }
};

export const orderMethod = {
    postOneOrder,
    getAllOrders,
};
