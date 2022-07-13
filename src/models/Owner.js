const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  user_key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cnpj: {
    type: String,
    required: [true, "cnpj e obrigatório"],
    unique: true,
    validade: {
      validade: (valor) => {
        return /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/.test(
          valor
        );
      },
      massage: (props) => `${props.value} nao e um cnpj valido`,
    },
  },
  address: { type: String, required: false },
});

module.exports = mongoose.model("owner", ownerSchema);
