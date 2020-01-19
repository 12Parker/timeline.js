export default `
input File {
  name: String
  title: String
}
  type User {
    password: String
    email: String
    message: String
  }
  type Data {
    _id: [String]
    id: String
    name: String
    message: String
    createdAt: [String]
    updatedAt: [String]
    success: Boolean
  }
  type Query {
    user(_id: String!): User
    users: [User]
    getData: [Data]
  }
  type Mutation {
    addUser(password: String!, email: String!): User  
    login(password: String!, email: String!): User  
    editUser(name: String!, email: String!): User
    deleteUser(args: String!): User
    uploadImage(file: [File]): Data
    updateData(id: ID!, comment: String!): Data
    deleteData(name: String!): Data
    updateImage(id: ID!, data: String!): Data
    uploadMoment(counter:Int!, title: String!): Data
    updateMoment(counter: Int!, title: String!): Data
    deleteMoment(title: String!): Data
  }
  `;
