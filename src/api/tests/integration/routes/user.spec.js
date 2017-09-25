const { expect } = require("chai");
const request = require("supertest");
const server = require("../../../../server");

describe('Servidor de Test de Integração', () => {

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
    describe('Cadastro de usuario, POST /cadastro', ()=>{
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
                });
        });
    })  ;

    describe(`PUT /users/:id`, ()=>{
        it('Alterar Usuario', done=>{
            let dataUpdate = {
                username:'joaoTest2_ALTEREI',
                password:'1234567890',
                tipo:'ADMIN',
                email:'joaoTest2@testIntegration.com'
            }
            // global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            request(server)
                .put(`/users/${id}`)
                .send(dataUpdate)
                .then(response=>{
                    expect(response.statusCode).equal(201)
                    done()
                });
        });
    });

    describe('DELETE /USER/:id', ()=>{
        it('Delete Usuario', done=>{
            request(server)
                .delete(`/users/${id}`)
                .then(response=>{
                    expect(response.statusCode).equal(201);
                    done();
                });
        });
    });
})