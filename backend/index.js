const express = require("express");
const swipl = require("swipl");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());


swipl.call("working_directory('./backend', '.').");
swipl.call("consult(knowledgebase).");

app.post("/diagnose", (req, res) => {
  
  const symptoms = req.body.symptoms;
  const query = `provide_diseases([${symptoms
    .map((symptom) => `'${symptom}'`)
    .join(",")}], Disease).`;

  let prologQuery = new swipl.Query(query);

  let diagnosisResults = [];

  function processDisease(disease) {
    if (disease.head) {
      diagnosisResults.push(disease.head);
      if (disease.tail) {
        processDisease(disease.tail);
      }
    }
  }

  let ret = null;
  while ((ret = prologQuery.next())) {
    processDisease(ret.Disease);
  }

  if (diagnosisResults.length > 0) {
    res.status(200).json({ diagnosis: diagnosisResults });
  } else {
    res.status(500).json({ error: "No diagnosis found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
