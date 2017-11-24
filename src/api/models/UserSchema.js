const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require("graphql");

const User = require("./users.model");

const users = new GraphQLObjectType({
    name: "user",
    description: "Lista de Usuários",
    fields: () => ({
        _id: {
            type: (GraphQLInt),
            description: "Identificador único do usuário",
        },
        username: {
            type: GraphQLString,
            description: "Nome do Usuário.",
        },
        email: {
            type: GraphQLString,
            description: "Email do Usuário",
        },
        password: {
            type: GraphQLString,
            description: "Senha do Usuário",
        },
        createdAt: {
            type: GraphQLString,
            description: "Data de criação",
        },
        tipo: {
            type: GraphQLString,
        },
    }),
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "users",
        fields: {
            user: {
                type: new GraphQLList(users),
                resolve: () =>
                    new Promise((resolve, reject) => {
                        User.find()
                            .then((user) => {
                                resolve(user);
                            }).catch((err) => {
                                reject(err);
                            });
                    }),
            },
        },
    }),
});
module.exports = { schema };
