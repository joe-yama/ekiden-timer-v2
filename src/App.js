import "./App.css";
import { EkidenTimer } from "./components/EkidenTimer";
import { Grid } from "@material-ui/core";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
      </Grid>
      <br />
      <div className="App">
        <EkidenTimer />
      </div>
    </>
  );
}
export default App;
