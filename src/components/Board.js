import React, { useState } from "react";
import { useTable } from "react-table";

import NameForm from "./NameForm";
import Runner from "./Runner";
import Table from "./Table";

function Board(props) {
  const [runners, setRunners] = useState([]);

  const addRunner = (runner) => {
    if (runner === "" || runners.includes(runner)) {
    } else {
      setRunners([...runners, runner]);
      console.log(runners);
    }
  };

  return (
    <>
      <NameForm onSubmit={addRunner} />
      {runners &&
        runners.map((runner) => (
          <div key={runner}>
            <p>name: {runner}</p>
          </div>
        ))}
    </>
  );
}

export default Board;
