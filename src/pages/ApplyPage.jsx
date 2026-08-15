import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import AppHeader from "../components/layout/AppHeader";
import ConfirmModal from "../components/ui/ConfirmModal";
import Step01PersonalDetails from "../components/steps/Step01PersonalDetails";
import Step02Experience from "../components/steps/Step02Experience";
import Step03Qualifications from "../components/steps/Step03Qualifications";
import Step04DBS from "../components/steps/Step04DBS";
import Step05RightToWork from "../components/steps/Step05RightToWork";
import Step06References from "../components/steps/Step06References";
import Step07Availability from "../components/steps/Step07Availability";
import Step08Skills from "../components/steps/Step08Skills";
import Step09AboutYou from "../components/steps/Step09AboutYou";
import Step10Documents from "../components/steps/Step10Documents";
import Step11Declaration from "../components/steps/Step11Declaration";
import Step12Review from "../components/steps/Step12Review";
import { submitApplication } from "../api/applications";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

// Fields to validate per step (only current step's fields are triggered)
const STEP_FIELDS = {
  1: [
    "fullName",
    "dateOfBirth",
    "email",
    "phone",
    "address",
    "city",
    "postcode",
    "nationality",
    "languages",
  ],
  2: [
    "yearsChildcareExp",
    "yearsNannyExp",
    "ageGroups",
    "previousRoles",
    "newbornExp",
    "toddlerExp",
    "schoolAgeExp",
    "multipleChildrenExp",
    "additionalNeedsExp",
  ],
  3: ["childcareQualifications", "paediatricFirstAid"],
  4: ["hasCurrentDBS"],
  5: ["rightToWork"],
  6: [
    "references.0.employerName",
    "references.0.email",
    "references.0.phone",
    "references.0.role",
    "references.0.relationship",
    "references.0.startDate",
  ],
  7: [
    "startDate",
    "workType",
    "liveInOut",
    "hoursAvailable",
    "weekendAvailability",
    "eveningAvailability",
    "areasWillingToWork",
    "maxDistance",
  ],
  8: [],
  9: ["aboutYourself", "whyNanny", "enjoyAboutChildcare", "familyType"],
  10: [],
  11: [
    "declarationAccurate",
    "consentReview",
    "consentReferences",
    "agreePrivacy",
    "agreeTerms",
    "declarationName",
    "declarationDate",
  ],
  12: [],
};

const STEP_NAMES = [
  "Personal Details",
  "Experience",
  "Qualifications",
  "DBS Checks",
  "Right to Work",
  "References",
  "Availability",
  "Skills",
  "About You",
  "Documents",
  "Declaration",
  "Review & Submit",
];

const TOTAL_STEPS = 12;

export default function ApplyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm({
    defaultValues: {
      references: [
        {
          employerName: "",
          email: "",
          phone: "",
          role: "",
          relationship: "",
          startDate: "",
          endDate: "",
        },
      ],
      declarationDate: new Date().toISOString().split("T")[0],
      yearsChildcareExp: "",
      yearsNannyExp: "",
      ageGroups: [],
      newbornExp: "",
      toddlerExp: "",
      schoolAgeExp: "",
      multipleChildrenExp: "",
      additionalNeedsExp: "",
      additionalNeedsDetail: "",
      previousRoles: "",
      otherExp: "",
    },
    mode: "onTouched",
  });

  const { trigger, handleSubmit, getValues } = methods;

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

  function handleEditStep(step) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFinalSubmit() {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const data = getValues();
      const { reference } = await submitApplication(data);
      navigate("/apply/confirmation", { state: { reference } });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <Step01PersonalDetails />;
      case 2:
        return <Step02Experience />;
      case 3:
        return <Step03Qualifications />;
      case 4:
        return <Step04DBS />;
      case 5:
        return <Step05RightToWork />;
      case 6:
        return <Step06References />;
      case 7:
        return <Step07Availability />;
      case 8:
        return <Step08Skills />;
      case 9:
        return <Step09AboutYou />;
      case 10:
        return <Step10Documents />;
      case 11:
        return <Step11Declaration />;
      case 12:
        return <Step12Review onEditStep={handleEditStep} />;
      default:
        return null;
    }
  }

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <AppHeader currentStep={currentStep} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator label */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-[#17202A]">
            {STEP_NAMES[currentStep - 1]}
          </h1>
          <p className="text-sm text-[#667085]">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-5 sm:p-7">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              {renderStep()}
            </form>
          </FormProvider>
        </div>

        {/* Navigation */}
        <div
          className={`mt-5 flex items-center ${currentStep === 1 ? "justify-end" : "justify-between"}`}
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
