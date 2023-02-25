const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const _ = require("lodash");
const authorModel = require("../model/author");
const bookModel = require("../model/book");



const BookType = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    authorId: {
      type: AuthorsType,
      resolve: (parent) => {
       return authorModel.findById(parent.authorId)
      },
    },
  }),
});

const AuthorsType = new GraphQLObjectType({
  name: "authors",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLID,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent,args) => {
        return  bookModel.find({
            authorId: parent.id
        })
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent,args) => {
        console.log("this is the args from server",args)
       return bookModel.findById(args.id)
      },
    },
    author: {
      type: AuthorsType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parent, arg) => {
     return authorModel.findById(arg.id)
      },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve: (parent, args) => {
           return bookModel.find({})
        }
    },
    authors: {
        type:new GraphQLList(AuthorsType),
        resolve: (parent, args) => {
           return authorModel.find({})
        }
    }
  },
});

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields: {
        addAutor: {
            type:AuthorsType,
            args: {
                name:{
                    type: new GraphQLNonNull(GraphQLString),
                },
                age:{
                    type:new GraphQLNonNull(GraphQLInt)
                },
              
            },
            resolve:(parent, args) => {
               const newAutor = new authorModel({
                name: args.name,
                age: args.age
               })
               return newAutor.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type:new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
                const createBook = new bookModel({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
               return createBook.save()
            }
        }

    }
})



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
