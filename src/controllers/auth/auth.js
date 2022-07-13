let Users = require("../../models/users");
const { Sing, sign } = require("jsonwebtoken");

module.exports = {
  auth: async (request, response, nex) => {
    const { name, password } = request.body;
    try {
      const user = await Users.findOne({ name: name });
      console.log(user);
      if (!user) {
        throw new Error("Name or password incorrect!");
      }

      const passwordMatch = user.password === password;

      if (!passwordMatch) {
        throw new Error("Email or password incorrect!");
      }

      const token = sign({}, "5221ec70259819bba5acc33bbcdac8cf", {
        subject: user.id,
        expiresIn: "1d",
      });

      const data = {
        name: user.name,
      };

      response.status(200).json({ user: data, token });
    } catch (error) {
      response.status(500).json({
        msg: "nao foi possível buscar o Usuário",
        error: error.message,
      });
    }
  },
};
