import React, { useState } from 'react';
import GeneralInfoForm from './GeneralInfoForm';
import MedicalInfoForm from './MedicalInfoForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import './form.css';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    insurance: '',
    emergencyContacts: [{ name: '', phone: '' }],
    lastExamDate: '',
    usesCorrectiveLenses: false,
    usesContacts: false,
    LensesPrescription: '',
    ContactsPrescription: '',
    lastPrescriptionDate: '',
    healthConcerns: [],
    otherConcerns: '',
    conditions: [],
    otherConditions: '',
    hadSurgery: false,
    surgeries: [],
    otherSurgeries: '',
    allergies: '',
    additionalDetails: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const progressPercent = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralInfoForm nextStep={nextStep} handleChange={handleChange} values={formData} />;
      case 2:
        return <MedicalInfoForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
      case 3:
        return <AdditionalDetailsForm prevStep={prevStep} values={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="progress-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>
      {renderStep()}
    </div>
  );
}
