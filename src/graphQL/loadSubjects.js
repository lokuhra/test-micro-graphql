import { compress } from "micro-graphql-react";

export default compress`
  query {
    allSubjects(SORT: { name: 1 }){
      Subjects {
        _id,
        name,
        backgroundColor
      }
    }
  }
`;
