const express= require('express');

const { graphqlHTTP } = require("express-graphql")
const app = express();

const graphqlSchema = require("./schema/schema");
const dbConnect = require('./utils/dbConnect');
const cors = require("cors")




app.use(cors())
app.use("/graphql", graphqlHTTP(
    {
        schema: graphqlSchema,
        graphiql:true
    }
))


const port  = process.env.PORT || 5000;


const connectDbAndServer =async () => {
    try {
      const res =  await dbConnect()
      if(res){
        app.listen(port, () => {
            console.log('db connected and listening on port ' + port)
        })
      }
    } catch (error) {
           console.log(error.message)        
    }
}


connectDbAndServer()