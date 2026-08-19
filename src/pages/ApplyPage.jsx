import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import AppHeader from "../components/layout/AppHeader";
import ConfirmModal from "../components/ui/ConfirmModal";
import Step01PersonalDetails from "../components/steps/Step01PersonalDetails";
import Step02WorkPreferences from "../components/steps/Step02WorkPreferences";
import Step03ChildcareExperience from "../components/steps/Step03ChildcareExperience";
import Step04Skills from "../components/steps/Step04Skills";
import Step05Qualifications from "../components/steps/Step05Qualifications";
import Step06Documents from "../components/steps/Step06Documents";
import Step07Declaration from "../components/steps/Step07Declaration";
import { submitApplication } from "../api/applications";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

// Fields to validate per step (only current step's fields are triggered)
const STEP_FIELDS = {
  1: [
    "firstName",
    "lastName",
    "dateOfBirth",
    "email",
    "phone",
    "address1",
    "city",
    "postcode",
    "area",
  ],
  2: [
    "workTypes",
  ],
  3: ["professionalChildcareExperienceYears"],
  4: [], // Skills handles required fields locally if needed, but not strictly required to trigger
  5: ["enhancedDBS", "paediatricFirstAid"],
  6: ["cv"], // CV is required
  7: [
    "informationAccurate",
    "applicationReviewConsent",
    "referenceConsent",
    "privacyPolicyConsent",
    "termsConsent",
  ],
};

const STEP_NAMES = [
  "Personal Details",
  "Work Preferences",
  "Childcare Experience",
  "Skills & Interests",
  "Qualifications",
  "Documents",
  "Declaration",
];

const TOTAL_STEPS = 7;

export default function ApplyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm({
    defaultValues: {
      workTypes: [],
      skills: [],
    },
    mode: "onTouched",
  });

  const { trigger, getValues } = methods;

  async function handleNext() {
    const fields = STEP_FIELDS[currentStep];
    const isValid = fields.length === 0 ? true : await trigger(fields);
    if (isValid) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFinalSubmit() {
    const isValid = await trigger(STEP_FIELDS[7]); // ensure step 7 is valid
    if (!isValid) {
      setShowModal(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const data = getValues();
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        if (key === 'cv' && data.cv && data.cv.length > 0) {
          // It's a FileList from the file input
          formData.append('cv', data.cv[0]);
        } else if (Array.isArray(data[key])) {
          // Arrays like skills and workTypes need stringifying or appending separately
          formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const { reference } = await submitApplication(formData);
      navigate("/apply/confirmation", { state: { reference } });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1: return <Step01PersonalDetails />;
      case 2: return <Step02WorkPreferences />;
      case 3: return <Step03ChildcareExperience />;
      case 4: return <Step04Skills />;
      case 5: return <Step05Qualifications />;
      case 6: return <Step06Documents />;
      case 7: return <Step07Declaration />;
      default: return null;
    }
  }

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <AppHeader currentStep={currentStep} />

      <main className="max-w-3xl mx-auto sm:px-6 py-8">
        {/* Step indicator label */}
        <div className="mb-5 px-4 sm:px-0">
          <h1 className="text-xl font-bold text-[#17202A]">
            {STEP_NAMES[currentStep - 1]}
          </h1>
          {/* <p className="text-sm text-[#667085]">
            Step {currentStep} of {TOTAL_STEPS}
          </p> */}
        </div>

        {/* Form card */}
        <div className="bg-white border-y sm:border border-[#E4E7EC] p-5 sm:p-7 w-full">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              {renderStep()}
            </form>
          </FormProvider>
        </div>

        {/* Navigation */}
        <div
          className={`mt-5 px-4 sm:px-0 flex items-center ${currentStep === 1 ? "justify-end" : "justify-between"}`}
        >
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4E7EC] text-sm font-medium
                text-[#17202A] bg-white hover:bg-[#F7F5F0] transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}

          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C5C] text-white text-sm font-semibold
                hover:bg-[#0B3D4A] transition-colors"
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D98B5F] text-white text-sm font-semibold
                hover:bg-[#C27A4E] transition-colors"
            >
              <Send size={15} />
              Submit Application
            </button>
          )}
        </div>

        {/* Submission error */}
        {submitError && (
          <p className="mt-3 text-sm text-[#C62828] text-center" role="alert">
            {submitError}
          </p>
        )}
      </main>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
