import "./styles.css";
import "./bootstrap.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import deboubce from "lodash.debounce";

import Header from "./components/header";
import Loading from "./components/loading";
import SearchPane from "./components/searchPane";
import DisplayBooks from "./components/displayBooks";

import LOAD_BOOKS from "./graphQL/loadBooks";
import LOAD_SUBJECTS from "./graphQL/loadSubjects";

import {
  GraphQL,
  buildQuery,
  Client,
  setDefaultClient
} from "micro-graphql-react";


const pageSize = 50;

setDefaultClient(
  new Client({
    endpoint: "https://mylibrary.io/graphql-public"
  })
);



class App extends Component {
  state = { page: 1, search: "" };
  pageUp = () => this.setState({ page: this.state.page + 1 });
  pageDown = () => this.setState({ page: this.state.page - 1 });
  setSearch = deboubce(search => this.setState({ search, page: 1 }), 500);

  render() {
    let { page, search } = this.state;
    search = search || void 0;

    return (
      <div className="App">
        <Header />

        <GraphQL
          query={{
            books: buildQuery(LOAD_BOOKS, { page, pageSize, search }),
            subjects: buildQuery(LOAD_SUBJECTS)
          }}
        >
          {({ books, subjects }) => {
            let isLoading = !books.loaded || !subjects.loaded || books.loading;
            return (
              <div>
                {isLoading ? <Loading /> : null}
                {books.loaded ? (
                  <div>
                    <SearchPane
                      page={page}
                      pageUp={this.pageUp}
                      pageDown={this.pageDown}
                      mayHaveMorePages={books.data.allBooks.Books.length === 50}
                      onChange={evt => this.setSearch(evt.target.value)}
                    />
                    <DisplayBooks books={books.data.allBooks.Books} />
                  </div>
                ) : null}
              </div>
            );
          }}
        </GraphQL>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
