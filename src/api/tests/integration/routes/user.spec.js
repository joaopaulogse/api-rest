const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../../server");

describe("Servidor de Test de Integração", () => {
    describe("GET /users", () => {
        it("Lista os usuarios", (done) => {
            request(server)
                .get("/users")
                .then((response) => {
                    expect(response.statusCode).equal(200);
                    done();
                });
        });
    });
    let id = null;
    describe("Cadastro de usuario, POST /cadastro", () => {
        it("Cadastra usuario e em logo em seguida exclui", (done) => {
            const data = {
                username: "joaoTest",
                password: "123456",
                tipo: "USUARIO",
                email: "joaoTest@testIntegration.com",
            };
            request(server)
                .post("/cadastro")
                .send(data)
                .then((response) => {
                    expect(response.statusCode).equal(200);
                    // expect(response.).equal(data)
                    id = response.body._id;
                    done();
                });
        });
    });
    describe("GET /users/:id", () => {
        it("Busca o usuario por Id", (done) => {
            request(server)
                .get(`/users/${id}`)
                .then((response) => {
                    expect(response.statusCode).equal(200);
                    done();
                });
        });
    });

    describe("PUT /users/:id", () => {
        it("Alterar Usuario", (done) => {
            const dataUpdate = {
                username: "joaoTest2_ALTEREI",
                password: "1234567890",
                tipo: "ADMIN",
                email: "joaoTest2@testIntegration.com",
            };
            // global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            request(server)
                .put(`/users/${id}`)
                .send(dataUpdate)
                .then((response) => {
                    expect(response.statusCode).equal(201);
                    done();
                });
        });
    });

    describe("DELETE /USER/:id", () => {
        it("Delete Usuario", (done) => {
            request(server)
                .delete(`/users/${id}`)
                .then((response) => {
                    expect(response.statusCode).equal(201);
                    done();
                });
        });
    });

    describe("NOT FOUND GET /users/:id", () => {
        it("Verificando Not found usuario", (done) => {
            request(server)
                .get("/users/1")
                .then((response) => {
                    expect(response.statusCode).equal(404);
                    done();
                });
        });
    });

    describe("NOT FOUND PUT /users/:id", () => {
        it("Verificando Not found usuario", (done) => {
            request(server)
                .put("/users/1")
                .then((response) => {
                    expect(response.statusCode).equal(400);
                    done();
                });
        });
    });

    describe("NOT FOUND DELETE /users/:id", () => {
        it("Verificando Not found usuario", (done) => {
            request(server)
                .delete("/users/1")
                .then((response) => {
                    expect(response.statusCode).equal(400);
                    done();
                });
        });
    });

    describe("NOT FOUND GET /urlqualquer", () => {
        it("Verificando Not found url", (done) => {
            request(server)
                .get("/naoexiste")
                .then((response) => {
                    expect(response.statusCode).equal(404);
                    done();
                });
        });
    });
});
