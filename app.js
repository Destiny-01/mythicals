const express = require("express");
const snarkjs = require("snarkjs");
const cors = require("cors");

const app = express();

function calc(result) {
  let response = [];
  const solution = [];
  const arr = ["0", "1", "2", "3", "4"];

  if (result.length < 1) {
    return (response = ["60", "61", "62", "63", "64"]);
  }
  if (result.length === 5) {
    return (response = result);
  }

  result.forEach((soln) => {
    if (response.length < 6) {
      response.push(soln);
      const solnMap = soln.split("");
      solution.push(solnMap[1]);
    }
  });
  const filter = arr.filter((x) => !solution.includes(x));
  filter.forEach((fil) => response.length < 6 && response.push("6" + fil));

  return response;
}

function unstringifyBigInts(o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}
app.use(express.json());
app.use(cors());

app.post("/proof", async (req, res) => {
  try {
    const { guess, solution, hash, salt } = req.body;
    console.log(req.body);

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        guess,
        solution,
        saltedSolution: salt,
        hashedSolution: hash,
      },
      "Dead.wasm",
      "Dead_0001.zkey"
    );
    console.log("suspect");
    console.log(publicSignals);
    const editedPublicSignals = unstringifyBigInts(publicSignals);
    const editedProof = unstringifyBigInts(proof);
    const calldat = await snarkjs.groth16.exportSolidityCallData(
      editedProof,
      editedPublicSignals
    );

    const calldata = calldat
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());
    const input = [
      [calldata[0], calldata[1]],
      [
        [calldata[2], calldata[3]],
        [calldata[4], calldata[5]],
      ],
      [calldata[6], calldata[7]],
      calldata.splice(8),
    ];
    const result = publicSignals.filter((signal) => signal.length === 2);
    const response = calc(result);

    return res.status(200).json({ response, input });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
