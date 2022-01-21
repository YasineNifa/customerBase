const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



// Hardcoded Data
const customers = [
    {id:"1",name:"Joe",email:"joe@gmail.com",age:25},
    {id:"2",name:"Joq",email:"joq@gmail.com",age:30},
    {id:"3",name:"Jow",email:"jow@gmail.com",age:15},
    {id:"4",name:"Jiz",email:"jiz@gmail.com",age:20},
]

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
                for (let i = 0; i<customers.length ; i++ ){
                    if (customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});