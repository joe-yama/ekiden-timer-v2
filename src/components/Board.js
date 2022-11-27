import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";

const range = (n) => [...Array(n).keys()];

export default function Board({ data }) {
  const [maxLap, setMaxLap] = useState(0);
  for (let elapseds in Object.values(data)) {
    if (elapseds.length > maxLap) setMaxLap(elapseds.length);
  }

  // const BoardHeader = (maxLap) => {
  //   return (
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>名前</TableCell>
  //         {range(maxLap).map((i) => {
  //           return <TableCell align="right">{`Lap ${i + 1}`}</TableCell>;
  //         })}
  //       </TableRow>
  //     </TableHead>
  //   );
  // };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            {range(maxLap).map((i) => {
              return <TableCell align="right">{`Lap ${i + 1}`}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        {/* <BoardHeader maxLap={maxLap} /> */}
        <TableBody>
          {Object.entries(data).map((item, index) => (
            <React.Fragment key={item[0]}>
              <TableRow
                key={item[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item[0]}
                </TableCell>
                <TableCell align="right">c</TableCell>
                <TableCell align="right">f</TableCell>
                <TableCell align="right">C</TableCell>
                <TableCell align="right">p</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
