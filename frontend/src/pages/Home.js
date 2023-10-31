import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);

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
    <div className="mx-auto mt-10 flex flex-col max-h-2xl max-w-xl items-center rounded-xl bg-white justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Symptoms
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mb-4">
          <h2 className="text-xl mb-2 font-semibold">Select Symptoms:</h2>
          <div className="space-y-">
            {availableSymptoms.map((symptom) => (
              <label
                key={symptom}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomSelect(symptom)}
                  className="text-blue-500 form-checkbox h-5 w-5"
                />
                <span className="text-gray-600 mb-2 font-bold uppercase">
                  {symptom}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleDiagnose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Diagnose
        </button>

        {diagnosis.length > 0 && (
          <div className="my-3">
            <p className="text-md font-semibold text-gray-500">
              As per the symptoms, the disease may be :
            </p>
            <ul className="list-disc list-inside">
              {diagnosis.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 mb-1 font-bold uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="text-gray-700 font-bold"><span className="text-gray-600 text-2xl font-bold mr-1">*</span>It is a preliminary diagnosis and may not be accurate. Please consult with a healthcare professional for a proper evaluation.</p>
    </div>
  );
}

export default Home;
