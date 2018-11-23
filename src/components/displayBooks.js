import React, { Component } from "react";
import { mutation } from "micro-graphql-react";

import UPDATE_BOOK from "../graphQL/updateBook.graphql";

@mutation(UPDATE_BOOK)
class EditBook extends Component {
  componentDidMount() {
    this.editEl.focus();
  }
  save = () => {
    this.props.runMutation(/* todo: */);
    this.props.done();
  };
  render() {
    let { book, done, running, finished } = this.props;
    return (
      <div>
        <input
          style={{ width: "60%", display: "inline" }}
          className="form-control"
          ref={el => (this.editEl = el)}
          defaultValue={book.title}
        />
        &nbsp;
        <button onClick={save} className="btn-sm btn">
          <i className="fal fa-save" />
        </button>
        &nbsp;
        <button onClick={done} className="btn-sm btn">
          <i className="fal fa-undo-alt" />
        </button>
      </div>
    );
  }
}

class SingleBookDisplay extends Component {
  state = { editing: false };
  editBook = () => this.setState({ editing: true });
  doneEditing = () => this.setState({ editing: false });
  render() {
    let { book } = this.props;
    let { editing } = this.state;
    //onClick={this.editBook} style={{ cursor: "pointer" }}
    return (
      <tr>
        <td>
          <img alt="" src={book.smallImage} />
        </td>
        <td style={{ textAlign: "left" }}>
          {editing ? (
            <EditBook book={book} done={this.doneEditing} />
          ) : (
            <b>{book.title}</b>
          )}
          {book.authors.length ? (
            <div style={{ fontStyle: "italic" }}>{book.authors.join(", ")}</div>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default ({ books }) => (
  <table className="table">
    <thead className="table-dark">
      <tr>
        <th />
        <th>Title</th>
      </tr>
    </thead>
    <tbody>{books.map(b => <SingleBookDisplay book={b} />)}</tbody>
  </table>
);
