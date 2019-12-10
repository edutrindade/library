const User = require("../models/User");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (req.body.email === "") {
      req.flash("warning", "Por favor, informe seu usuário");
      return res.redirect("/");
    }

    if (req.body.email !== "" && req.body.password === "") {
      req.flash("warning", "Por favor, informe sua senha");
      return res.redirect("/");
    }

    if (!user) {
      req.flash("error", "Usuário não encontrado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      req.flash("error", "Senha incorreta");
      return res.redirect("/");
    }

    req.session.user = user;

    return res.redirect("dashboard");
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      return res.redirect("/");
    });
  }
}

module.exports = new SessionController();
