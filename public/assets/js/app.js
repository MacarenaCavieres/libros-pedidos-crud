const list = document.querySelector("#list");
const listOrders = document.querySelector("#listOrders");
const form = document.querySelector("#form");

const myModal = new bootstrap.Modal(document.getElementById("modal"));

const getAllBooks = async () => {
    try {
        const { data } = await axios.get("/api/v1/libros");

        printBooks(data);
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

const printBooks = (data) => {
    list.textContent = "";
    data.forEach((item) => {
        const li = document.createElement("li");
        const btnEditar = document.createElement("button");
        const btnEliminar = document.createElement("button");
        const btnComprar = document.createElement("button");
        const formCantidad = document.createElement("form");
        const inpCantidad = document.createElement("input");
        const label = document.createElement("label");
        const divBtnes = document.createElement("div");
        const divInput = document.createElement("div");

        li.textContent = `Nombre: ${item.nombre} - Autor: ${item.autor} - Precio: ${item.precio} - Stock: ${item.stock}`;
        li.classList.add("list-group-item");

        divBtnes.classList.add("my-3");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn", "btn-warning", "btn-editar", "me-2");
        btnEditar.setAttribute("type", "button");
        btnEditar.dataset.id = item.id;
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn", "btn-danger", "btn-eliminar");
        btnEliminar.setAttribute("type", "button");
        btnEliminar.dataset.id = item.id;

        divBtnes.appendChild(btnEditar);
        divBtnes.appendChild(btnEliminar);

        formCantidad.dataset.id = item.id;
        formCantidad.addEventListener("submit", (e) => {
            e.preventDefault();
            doTransaction(e.target.cantidad.value, e.target.dataset.id);
        });
        label.textContent = `Si desea comprar "${item.nombre}", ingrese la cantidad`;
        label.classList.add("form-label");
        label.setAttribute("for", "cantidad");
        inpCantidad.placeholder = "Cantidad";
        inpCantidad.name = "cantidad";
        inpCantidad.type = "number";
        inpCantidad.classList.add("form-control", "w-25");
        btnComprar.textContent = "Comprar";
        btnComprar.classList.add("btn", "btn-info", "btn-comprar", "text-white", "mt-2");
        btnComprar.setAttribute("type", "submit");
        // btnComprar.dataset.id = item.id;

        formCantidad.appendChild(label);
        formCantidad.appendChild(inpCantidad);
        formCantidad.appendChild(btnComprar);

        divInput.appendChild(formCantidad);

        li.appendChild(divBtnes);
        li.appendChild(divInput);

        list.appendChild(li);
    });
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const autor = e.target.autor.value;
    const precio = e.target.precio.value;
    const stock = e.target.stock.value;

    if (!nombre.trim() || !autor.trim() || !precio.trim() || !stock.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.post("/api/v1/libros", {
            nombre,
            autor,
            precio,
            stock,
        });

        getAllBooks();
    } catch (error) {
        console.error("Error front ===> ", error);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        deleteBook(e.target.dataset.id);
    }
});

const deleteBook = async (id) => {
    try {
        await axios.delete(`/api/v1/libros/${id}`);

        getAllBooks();
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-editar")) {
        myModal.show();
        getEditBook(e.target.dataset.id);
    }
});

const formEdit = document.querySelector("#formEdit");
const getEditBook = async (id) => {
    try {
        const { data } = await axios.get(`/api/v1/libros/${id}`);

        formEdit.nombre.value = data.nombre;
        formEdit.autor.value = data.autor;
        formEdit.precio.value = data.precio;
        formEdit.stock.value = data.stock;
        formEdit.dataset.id = id;
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    updateBook(e.target.dataset.id);
});

const updateBook = async (id) => {
    const nombre = formEdit.nombre.value;
    const autor = formEdit.autor.value;
    const precio = formEdit.precio.value;
    const stock = formEdit.stock.value;

    if (!nombre.trim() || !autor.trim() || !precio.trim() || !stock.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.put(`/api/v1/libros/${id}`, {
            nombre,
            autor,
            precio,
            stock,
        });

        myModal.hide();

        getAllBooks();
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

getAllBooks();

// ---------------------- pedidos------------------------------------------

const getAllOrders = async () => {
    try {
        const { data } = await axios.get("/api/v1/pedidos");

        printOrders(data);
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

const printOrders = (data) => {
    listOrders.textContent = "";
    data.forEach((item) => {
        const li = document.createElement("li");

        li.classList.add("list-group-item");
        li.textContent = `Cantidad: ${item.cantidad} - Libro_id: ${item.libro_id}`;

        listOrders.appendChild(li);
    });
};

const doTransaction = async (cantidad, id) => {
    try {
        await axios.post("/api/v1/pedidos", {
            cantidad,
            libro_id: id,
        });
        getAllOrders();
    } catch (error) {
        console.error("Error front ===> ", error);
    }
};

getAllOrders();
