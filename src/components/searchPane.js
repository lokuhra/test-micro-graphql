import React from "react";

export default ({ pageDown, pageUp, page, onChange, mayHaveMorePages }) => (
  <div className="controls-header">
    <button onClick={pageDown} disabled={page === 1} className="btn btn-sm">
      Prev
    </button>
    &nbsp;
    <button
      onClick={pageUp}
      disabled={!mayHaveMorePages}
      className="btn btn-sm"
    >
      Next
    </button>
    &nbsp;
    <input className="form-control search-input" onChange={onChange} />
  </div>
);
