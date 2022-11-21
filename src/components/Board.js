import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Board({ data }) {
  let maxLap = 0;
  for (let elapseds in Object.values(data)) {
    if (elapseds.length > maxLap) maxLap = elapseds.length;
  }

  const BoardHeader = (maxLap) => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>名前</TableCell>
          {Array.from(Array(maxLap), (v, k) => k).map((i) => {
            <TableCell align="right">{`Lap ${i + 1}`}</TableCell>;
          })}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <BoardHeader maxLap={maxLap} />
        <TableBody>
          {Object.entries(data).map((runner, elapseds) => (
            <TableRow
              key={runner}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {runner}
              </TableCell>
              <TableCell align="right">c</TableCell>
              <TableCell align="right">f</TableCell>
              <TableCell align="right">C</TableCell>
              <TableCell align="right">p</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
