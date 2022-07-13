const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  cpf: {
    type: String,
    required: [true, "cpf e obrigatório"],
    unique: true,
    validade: {
      validade: (valor) => {
        return /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(valor);
      },
      massage: (props) => `${props.value} nao e um cpf valido`,
    },
  },
  phone: {
    type: String,
    required: false,
    validade: {
      validade: (valor) => {
        return /^\(?\d{2}\)?[\s-]?\d{4}-?\d{4}$/.test(valor);
      },
      massage: (props) => `${props.value} nao e um telefone valido`,
    },
  },
});

module.exports = mongoose.model("users", userSchema);
