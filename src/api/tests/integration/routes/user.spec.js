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
    let id = null
    describe('Cadastro de usuario /cadastro', ()=>{
        it('Cadastra usuario e em logo em seguida exclui', done=>{
            let data = {
                username:'joaoTest',
                password:'123456',
                tipo:'USUARIO',
                email:'joaoTest@testIntegration.com'
            }
            request(server)
                .post('/cadastro')
                .send(data)
                .then(response=>{
                    expect(response.statusCode).equal(200)
                    // expect(response.).equal(data)
                    id = response.body._id
                    done()
                })
        })
    })
    describe("GET /users/:id", () => {
        it("Busca o usuario por Id", done => {
            request(server)
                .get(`/users/${id}`)
                .then(response => {
                    expect(response.statusCode).equal(200);
                    done();
                })
        })
    })  
})