const axios = require('axios');
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



// Hardcoded Data
// const customers = [
//     {id:"1",name:"Joe",email:"joe@gmail.com",age:25},
//     {id:"2",name:"Joq",email:"joq@gmail.com",age:30},
//     {id:"3",name:"Jow",email:"jow@gmail.com",age:15},
//     {id:"4",name:"Jiz",email:"jiz@gmail.com",age:20},
// ]

// Customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLInt},

    })
});
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args:{
                id: {type: GraphQLString}
            },
            resolve(parentValue,args){
                return axios.get('http://localhost:3000/customers/'+args.id)
                            .then(res => res.data);
                // for (let i = 0; i<customers.length ; i++ ){
                //     if (customers[i].id == args.id){
                //         return customers[i];
                //     }
                // }
            }
        },
        customers: {
            type: GraphQLList(CustomerType),
            resolve(parentValue){
                return axios.get('http://localhost:3000/customers/')
                            .then(res => res.data);
            }

        }
    }
    
});

// Mutation
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addCustomer:{
            type: CustomerType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},

            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers',{
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then( res => res.data);
            }
        },
        deleteCustomer:{
            type: CustomerType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/'+args.id)
                            .then(res => res.data);
            }
        },
        editCustomer:{
            type: CustomerType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                age:{type: GraphQLInt},

            },
            resolve(parentValue, args){
                return axios.put('http://localhost:3000/customers/'+args.id, args).then( res => res.data);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});