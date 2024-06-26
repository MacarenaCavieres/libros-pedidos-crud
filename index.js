import "dotenv/config";
import express from "express";
import bookRouter from "./routes/libro.route.js";
import orderRouter from "./routes/pedido.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/v1/libros", bookRouter);
app.use("/api/v1/pedidos", orderRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
