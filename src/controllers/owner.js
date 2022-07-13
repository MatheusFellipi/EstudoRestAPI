let Owner = require("../models/Owner");

module.exports = {
  addOwner: async (request, response, nex) => {
    const { name, cnpj, address, user_key } = request.body;
    try {
      const newOwner = new Owner();
      newOwner.user_key = user_key;
      newOwner.name = name;
      newOwner.cnpj = cnpj;
      newOwner.address = address ?? "";

      const owner = await newOwner.save();

      response.status(201).json({
        msg: "Empresa adicionada com sucesso",
        owner,
      });
    } catch (error) {
      response.status(500).json({
        msg: "Error ao salvar a Empresa",
        error: error.message,
      });
    }
  },
  getAllOwner: async (request, response, nex) => {
    try {
      const owners = await Owner.find();
      response.status(201).json(owners);
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível buscar todos as empresa",
        error: error.message,
      });
    }
  },
  getOwnerById: async (request, response, nex) => {
    const { id } = request.params;
    try {
      const owners = await Owner.findById(id);
      response.status(201).json({
        owners,
      });
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível buscar todos as empresa",
        error: error.message,
      });
    }
  },
  updateOwner: async (request, response, nex) => {
    const { name, cnpj, address } = request.body;
    const { id } = request.params;
    let updateOwnerData = {};

    if (name) updateOwnerData.name = name;
    if (cnpj) updateOwnerData.cnpj = cnpj;
    if (address) updateOwnerData.address = address;

    try {
      await Owner.updateOne({ _id: id }, updateOwnerData);
      response.status(201).json({
        msg: "Empresa atualizado  com sucesso",
      });
    } catch (error) {
      response.status(500).json({
        msg: "Error ao salvar a Empresa",
        error: error.message,
      });
    }
  },

  RemoverOwner: async (request, response, nex) => {
    const { id } = request.params;
    try {
      const owners = await Owner.findByIdAndDelete(id);
      response.status(201).json({
        owners,
      });
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível deletar a empresa",
        error: error.message,
      });
    }
  },
};
