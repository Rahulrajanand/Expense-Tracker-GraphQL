//type Query {                  //this will tell our schema what kind of queries we could have for users
// signUp(input: SignUpInput!): User        //User will be send as a response back
// login(input: LoginInput!): User      //User will be send as a response back 


const userTypeDef = `#graphql 
type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePicture: String
    gender: String!
    
}

type Query {                 
    authUser: User
    user(userId:ID!): User
}

type Mutation {
    signUp(input: SignUpInput!): User        
    login(input: LoginInput!): User          
    logout: LogoutResponse
}

input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
}

input LoginInput {
    username: String!
    password: String!
}

type LogoutResponse {
    message: String!
}

`;

export default userTypeDef;