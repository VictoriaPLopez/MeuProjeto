import 'dotenv/config';
import * as db from "./db.js"
import express from 'express';

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req,res) =>{
    res.json({
        message: "Funcionando",
    })
});

app.get("/clientes/:id", async(req,res) =>{
    const clientes = await db.selectCliente(req.params.id);
    res.json(clientes);
});

app.get("/clientes", async(req,res) =>{
    const clientes = await db.selectClientes();
    res.json(clientes);
});

app.get("/teste", (req,res) =>{
    res.json({
        message:"Testando"
    })
})

app.listen(port);

console.log("Backend rodando!")

