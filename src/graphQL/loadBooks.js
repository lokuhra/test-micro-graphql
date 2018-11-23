import { compress } from "micro-graphql-react";

export default compress`
  query ($page: Int, $pageSize: Int, $search: String){
    allBooks(PAGE: $page, PAGE_SIZE: $pageSize, title_contains: $search, SORT: { title: 1 }){
      Books {
        _id,
        title,
        smallImage,
        authors
      }
    }
  }
`;
