module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "docker",
  password: "docker",
  database: "librarydb",
  operatorsAliases: 1,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
