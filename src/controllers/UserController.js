const User = require("../models/User");

module.exports = {
  create(req, res) {
    return res.render("auth/signup");
  },

  // Salvar usuário no banco
  async store(req, res) {
    //req.body.password = "12345";
    const { filename: avatar } = req.file;

    //const { name, email, librarian } = req.body;
    const user = await User.create({ ...req.body, avatar });
    req.flash("success", "Usuário cadastrado com sucesso");
    return res.redirect("/");
    //return res.json(user);
  },

  // Listar usuários
  async list(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }
};
