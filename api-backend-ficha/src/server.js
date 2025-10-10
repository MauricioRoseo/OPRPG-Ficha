import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import { errorsHandler } from "./middlewares/errorsHandler.js";
import { notFoundController } from "./controllers/notFoundController.js";
import { welcomeController } from "./controllers/welcomeController.js";
import characterRouter from "./routers/characterRouter.js";
import itemRouter from "./routers/itemRouter.js";

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", welcomeController);
app.use("/character", characterRouter);
app.use("/item", itemRouter);

app.use(notFoundController);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
