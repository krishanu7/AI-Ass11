import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]); // Initialize as an empty array

  const availableSymptoms = [
    "fever",
    "cough",
    "conjunctivitis",
    "runny_nose",
    "rash",
    "headache",
    "body_ache",
    "chills",
    "sore_throat",
    "sneezing",
    "swollen_glands",
  ];

  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleDiagnose = async () => {
    try {
      const res = await axios.post("http://localhost:8080/diagnose", {
        symptoms: selectedSymptoms,
      });
      if (res.status === 200) {
        setDiagnosis(res.data.diagnosis);
      }
    } catch (error) {
      console.error("Error diagnosing:", error);
    }
  };

  return (
    <div>
      <h1>Disease Diagnosis</h1>
      <div>
        <h2>Select Symptoms:</h2>
        <div>
          {availableSymptoms.map((symptom) => (
            <label key={symptom}>
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleSymptomSelect(symptom)}
              />
              {symptom}
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleDiagnose}>Diagnose</button>
      {diagnosis.length > 0 && (
        <div>
          <p>Diagnosis:</p>
          <ul>
            {diagnosis.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
