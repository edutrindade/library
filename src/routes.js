const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);
const flash = require("connect-flash");

const routes = express.Router();

const authMiddleware = require("./middlewares/auth");
const guestMiddleware = require("./middlewares/guest");

const SessionController = require("./controllers/SessionController");
const DashboardController = require("./controllers/DashboardController");
const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const FileController = require("./controllers/FileController");

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("success");
  res.locals.flashError = req.flash("error");
  res.locals.flashWarning = req.flash("warning");
  res.locals.flashPrimary = req.flash("primary");

  return next();
});

routes.get("/files/:file", FileController.show);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.use("/", authMiddleware);

routes.get("/logout", SessionController.destroy);
routes.get("/dashboard", DashboardController.index);

routes.get("/users", UserController.list); // Lista usuários
routes.post("/users", UserController.store); // Cria usuário

routes.get("/users/:user_id/addresses", AddressController.list); // Lista Endereços
routes.post("/users/:user_id/addresses", AddressController.store); // Cria endereço para usuário

module.exports = routes;
