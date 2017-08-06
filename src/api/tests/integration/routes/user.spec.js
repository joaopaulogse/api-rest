const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../../server");

describe('server test', () => {

    describe("GET /users", () => {
        it("Lista os usuarios", done => {
            request(server)
                .get('/users')
                .then((response) => {
                    expect(response.statusCode).equal(200);
                    done();
                })
        })
    });
    describe("GET /users/:id", () => {
        it("Busca o usuario por Id", done => {
            request(server)
                .get("/users/1")
                .then(response => {
                    expect(response.statusCode).equal(200);
                    done();
                })
        })
    })
})