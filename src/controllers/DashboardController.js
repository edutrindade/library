const User = require("../models/User");

class DashboardController {
  async index(req, res) {
    const librarians = await User.findAll({ where: { librarian: true } });

    return res.render("dashboard/index", { librarians });
  }
}

module.exports = new DashboardController();
