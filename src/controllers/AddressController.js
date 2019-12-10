const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
  // Criar usuário
  async store(req, res) {
    const { user_id } = req.params;
    const {
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      user_id
    });

    return res.json(address);
  },

  // Listar usuários
  async list(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "addresses" }
    });

    return res.json(user.addresses);
  }
};
