let Users = require("../models/users");

module.exports = {
  addUsers: async (request, response, nex) => {
    const { name, cpf, phone, password } = request.body;
    try {
      const newUsers = new Users();
      newUsers.name = name;
      newUsers.cpf = cpf;
      newUsers.password = password;
      newUsers.phone = phone ?? "";

      const user = await newUsers.save();

      response.status(201).json({
        msg: "Usuário adicionada com sucesso",
        user,
      });
    } catch (error) {
      response.status(500).json({
        msg: "Error ao salvar a Usuário",
        error: error.message,
      });
    }
  },

  getAllUsers: async (request, response, nex) => {
    try {
      const users = await Users.find();
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível buscar todos as Usuário",
        error: error.message,
      });
    }
  },
  getUsersById: async (request, response, nex) => {
    const { id } = request.params;
    try {
      const user = await Users.findById(id);
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível buscar o Usuário",
        error: error.message,
      });
    }
  },
  updateUsers: async (request, response, nex) => {
    const { name, cpf, phone } = request.body;
    const { id } = request.params;
    let updateUsersData = {};

    if (name) updateUsersData.name = name;
    if (cpf) updateUsersData.cpf = cpf;
    if (phone) updateUsersData.phone = phone;

    try {
      await Users.updateOne({ _id: id }, updateUsersData);
      response.status(200).json({
        msg: "Usuário atualizado  com sucesso",
      });
    } catch (error) {
      response.status(500).json({
        msg: "Error ao salvar a Usuário",
        error: error.message,
      });
    }
  },
  RemoverUsers: async (request, response, nex) => {
    const { id } = request.params;
    try {
      await Users.findByIdAndDelete(id);
      response.status(200).json({
        msg: "removido com sucesso",
      });
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível deletar a Usuário",
        error: error.message,
      });
    }
  },
};
