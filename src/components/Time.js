export function elapsed2timestr(elapsed, includeMs = true) {
  const h = parseInt(elapsed / 60 / 60 / 1000, 10)
    .toString()
    .padStart(2, "0");
  const m = parseInt(elapsed / 60 / 1000, 10)
    .toString()
    .padStart(2, "0");
  const s = parseInt(elapsed / 1000, 10)
    .toString()
    .padStart(2, "0");
  const ms = parseInt((elapsed % 1000) / 10, 10)
    .toString()
    .padStart(2, "0");
  const timestr = h + ":" + m + ":" + s;
  return includeMs ? timestr + "." + ms : timestr;
}

export default function Time({ elapsed }) {
  // return (
  //   <>
  //     {parseInt(elapsed / 60 / 60 / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>:</span>
  //     {parseInt(elapsed / 60 / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>:</span>
  //     {parseInt(elapsed / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>.</span>
  //     {parseInt((elapsed % 1000) / 10, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //   </>
  // );
  return elapsed2timestr(elapsed);
}
