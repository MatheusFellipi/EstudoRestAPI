const app = require("../../bin/www");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseURL = "http://localhost:3000/";
chai.use(chaiHttp);
let usersTest = {
  name: "Matheus Fellipi",
  cpf: "00000000000",
  phone: "64992576711",
};
describe("teste de usuário na api", () => {
  it("deve buscar todos os usauario", (done) => {
    chai
      .request(baseURL)
      .get("users/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
  it("Deve apresentar um erro 404", (done) => {
    chai
      .request(baseURL)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
  it("Deve adicionar um novo usuário", (done) => {
    chai
      .request(baseURL)
      .post("users/")
      .send(usersTest)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("user");
        usersTest._id = res.body.user._id;
        done();
      });
  });
  it("Nao deve adicionar um novo usuário (falta cpf)", (done) => {
    chai
      .request(baseURL)
      .post("users/")
      .send({
        name: "Matheus Fellipi",
        phone: "64992576711",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });
  it("Deve atualizar um usuário existente", (done) => {
    let usersEdit = {
      name: "Matheus Editado",
    };
    chai
      .request(baseURL)
      .put(`users/` + usersTest._id)
      .send(usersEdit)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("msg");
        console.log(res.body);
        done();
      });
  });
  it("Deve retorna um usuário existente e especifico", (done) => {
    chai
      .request(baseURL)
      .get(`users/` + usersTest._id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("Matheus Editado");

        done();
      });
  });
  it("Nao deve retorna um usuário existente e especifico (id nao existe)", (done) => {
    chai
      .request(baseURL)
      .get(`users/` + 5156146546465464)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");

        done();
      });
  });
  it("Deve remover um usuário", (done) => {
    chai
      .request(baseURL)
      .delete(`users/` + usersTest._id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.not.have.property("error");
        done();
      });
  });
});
