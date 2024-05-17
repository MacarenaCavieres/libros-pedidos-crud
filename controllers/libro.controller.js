import { handleErrors } from "../database/errors.js";
import { Book } from "../models/libro.model.js";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.getAll();
        if (data.length === 0) return res.json({ ok: true, msg: "Sin registros" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOneBook = async (req, res) => {
    try {
        const { nombre, autor, precio, stock } = req.body;

        if (!nombre || !autor || !precio || !stock)
            return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

        const newBook = {
            id: uuidv4(),
            nombre,
            autor,
            precio,
            stock,
        };

        const data = await Book.postOne(newBook);

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!uuidValidate(id)) return res.status(400).json({ ok: false, msg: "ID no válido" });

        const data = await Book.getOne(id);

        if (!data) return res.status(400).json({ msg: "Registro no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const deleteOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!uuidValidate(id)) return res.status(400).json({ ok: false, msg: "ID no válido" });

        const { msg } = await Book.deleteOne(id);

        return res.json({ msg });
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const updateOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, autor, precio, stock } = req.body;

        if (!uuidValidate(id)) return res.status(400).json({ ok: false, msg: "ID no válido" });

        if (!nombre || !autor || !precio || !stock)
            return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

        const data = await Book.updateOne(id, nombre, autor, precio, stock);

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const bookMethod = {
    getAllBooks,
    postOneBook,
    getOneBook,
    deleteOneBook,
    updateOneBook,
};
