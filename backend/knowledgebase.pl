% Define the knowledge base of diseases and their symptoms.
disease_symptoms(measles, [fever, cough, conjunctivitis, runny_nose, rash]).
disease_symptoms(german_measles, [fever, headache, runny_nose, rash]).
disease_symptoms(flu, [fever, headache, body_ache, conjunctivitis, chills, sore_throat, runny_nose, cough]).
disease_symptoms(common_cold, [headache, sneezing, sore_throat, runny_nose, chills]).
disease_symptoms(mumps, [fever, swollen_glands]).
disease_symptoms(chicken_pox, [fever, chills, body_ache, rash]).

% Entry point for providing diseases based on symptoms
provide_diseases(Symptoms, Diseases) :-
    findall(Disease, (disease_symptoms(Disease, DiseaseSymptoms), subset(Symptoms, DiseaseSymptoms)), Diseases).
