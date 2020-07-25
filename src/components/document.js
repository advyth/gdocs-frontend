import React from "react";

const Document = ({ documents, loading, onclick }) => {
  if (loading) {
    return <div class="spinner-border" role="status" />;
  }
  var docList = documents.map(({ filename, author, id }) => {
    return (
      <div onClick={()=>onclick(id, filename)} key={id} className="file shadow-sm">
        <h6>{filename}</h6>
        <h6>{author}</h6>
      </div>
    );
  });
  return docList;
};

export default Document;
