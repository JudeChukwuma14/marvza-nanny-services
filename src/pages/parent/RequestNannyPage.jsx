import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import AppHeader from '../../components/layout/AppHeader'
import ConfirmModal from '../../components/ui/ConfirmModal'
import ParentStep01ServiceAndSchedule from '../../components/parentSteps/ParentStep01ServiceAndSchedule'
import ParentStep02FamilyAndChildren from '../../components/parentSteps/ParentStep02FamilyAndChildren'
import ParentStep03ContactAndLocation from '../../components/parentSteps/ParentStep03ContactAndLocation'
import ParentStep04Review from '../../components/parentSteps/ParentStep04Review'
import { submitEnquiry } from '../../api/enquiries'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'

const STEP_FIELDS = {
  1: ['serviceType', 'frequency', 'isUrgent', 'preferredStartDate', 'daysNeeded', 'hoursPerWeek'],
  2: ['children', 'duties', 'experienceRequired'],
  3: ['postcode', 'area', 'locationType', 'livingArrangement', 'parentFirstName', 'parentLastName', 'email', 'phone', 'contactMethod'],
  4: ['agreeToContact'],
}

const TOTAL_STEPS = 4

export default function RequestNannyPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const methods = useForm({
    defaultValues: {
      daysNeeded: [],
      children: [{ name: '', age: '', gender: '', notes: '' }],
      duties: [],
      qualifications: [],
    },
    mode: 'onTouched',
  })

  const { trigger, getValues } = methods

  async function handleNext() {
    const fields = STEP_FIELDS[currentStep] || []
    const isValid = fields.length === 0 ? true : await trigger(fields)
    if (isValid) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBack() {
    setCurrentStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleFinalSubmit() {
    const isValid = await trigger(STEP_FIELDS[4])
    if (!isValid) {
      setShowModal(false)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      const data = getValues()
      const { reference } = await submitEnquiry(data)
      navigate('/request-nanny/confirmation', { state: { reference } })
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    } finally {
      setShowModal(false)
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1: return <ParentStep01ServiceAndSchedule />
      case 2: return <ParentStep02FamilyAndChildren />
      case 3: return <ParentStep03ContactAndLocation />
      case 4: return <ParentStep04Review setCurrentStep={setCurrentStep} />
      default: return null
    }
  }

  const isLastStep = currentStep === TOTAL_STEPS

  return (
    <div className="min-h-screen bg-[#F8F3EA] flex flex-col">
      <AppHeader />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-[#E4D8C7] shadow-sm p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              {renderStep()}
            </form>
          </FormProvider>
        </div>

        <div className={`mt-6 flex items-center ${currentStep === 1 ? 'justify-end' : 'justify-between'}`}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E4D8C7] text-sm font-medium text-[#3B2923] bg-white hover:bg-[#F8F3EA] transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          )}

          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B2923] text-white text-sm font-semibold hover:bg-[#2A1B17] transition-colors shadow-sm"
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B88A62] text-white text-sm font-semibold hover:bg-[#9C7048] transition-colors shadow-sm"
            >
              <Send size={15} />
              Submit Request
            </button>
          )}
        </div>

        {submitError && (
          <p className="mt-4 text-sm font-medium text-[#B94A48] text-center" role="alert">
            {submitError}
          </p>
        )}
      </main>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
        title="Submit your request?"
        description="Please confirm you are ready to submit. Once submitted, our team will review your request and get in touch."
        confirmText="Submit Request"
      />
    </div>
  )
}
