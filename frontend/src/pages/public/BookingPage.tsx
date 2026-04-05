import { useEffect, useMemo, useState } from 'react';

import BookingCategoryStep from '../../components/public/booking/BookingCategoryStep';
import BookingCustomizationStep from '../../components/public/booking/BookingCustomizationStep';
import BookingDetailsStep from '../../components/public/booking/BookingDetailsStep';
import BookingReviewStep from '../../components/public/booking/BookingReviewStep';
import BookingStepper from '../../components/public/booking/BookingStepper';
import BookingSummaryCard from '../../components/public/booking/BookingSummaryCard';
import BookingErrorState from '../../components/public/booking/BookingErrorState';
import BookingPackageStep from '../../components/public/booking/BookingPackageStep';

import { bookingFlowService } from '../../services/bookings/bookingFlowService';
import { bookingService } from '../../services/bookings/bookingService';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { useMascots } from '../../hooks/useMascots';

import type {
  BookingCategoryOption,
  BookingCategoryKey,
  BookingCustomizationConfig,
  Package,
} from '../../types';

export default function BookingPage() {
  const {
    stepOrder,
    currentStep,
    selectedCategory,
    selectedPackage,
    customizationConfig,
    customization,
    details,
    setSelectedCategory,
    setSelectedPackage,
    setCustomizationConfig,
    setCustomization,
    setDetails,
    goToNextStep,
    goToPreviousStep,
    resetFlow,
  } = useBookingFlow();

  const { mascots } = useMascots();

  const [categories, setCategories] = useState<BookingCategoryOption[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    bookingFlowService
      .getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setPackages([]);
      setCustomizationConfig(null);
      return;
    }

    setPackagesLoading(true);
    setPackagesError(null);

    Promise.all([
      bookingFlowService.getPackagesByCategory(selectedCategory),
      bookingFlowService.getCustomizationConfig(selectedCategory),
    ])
      .then(([packagesData, customization]) => {
        setPackages(packagesData);
        setCustomizationConfig(customization as BookingCustomizationConfig);
      })
      .catch((error: Error) => {
        setPackages([]);
        setPackagesError(error.message || 'Failed to load packages.');
      })
      .finally(() => {
        setPackagesLoading(false);
      });
  }, [selectedCategory, setCustomizationConfig]);

  const totalPrice = useMemo(() => {
    return Number(
      selectedPackage?.base_price ?? (selectedPackage as any)?.price ?? 0
    );
  }, [selectedPackage]);

  const currentStepLabel = useMemo(() => {
    const index = stepOrder.findIndex((step) => step === currentStep);
    return `Step ${index + 1} of ${stepOrder.length}`;
  }, [currentStep, stepOrder]);

  const canContinue = useMemo(() => {
    if (currentStep === 'category') return Boolean(selectedCategory);
    if (currentStep === 'package') return Boolean(selectedPackage);
    if (currentStep === 'customization') return true;
    if (currentStep === 'details') {
      return Boolean(
        details.fullName &&
          details.phone &&
          details.eventTitle &&
          details.eventDate &&
          details.venueName
      );
    }
    return true;
  }, [currentStep, selectedCategory, selectedPackage, details]);

  const handleCategorySelect = (category: BookingCategoryKey) => {
    setSelectedCategory(category);
    setSelectedPackage(null);
    setCustomization({
      mascots: [],
      activities: [],
      extras: [],
      theme: null,
      backdrop: null,
      bounceUnit: null,
      bubbleExperience: null,
    });
  };

  const handleDetailsChange = (field: keyof typeof details, value: string | number) => {
    setDetails({
      ...details,
      [field]: value,
    });
  };

  const toggleValueInArray = (values: number[], id: number) => {
    return values.includes(id)
      ? values.filter((item) => item !== id)
      : [...values, id];
  };

  const handleToggleMascot = (id: number) => {
    setCustomization({
      ...customization,
      mascots: toggleValueInArray(customization.mascots, id),
    });
  };

  const handleToggleActivity = (id: number) => {
    setCustomization({
      ...customization,
      activities: toggleValueInArray(customization.activities, id),
    });
  };

  const handleToggleExtra = (id: number) => {
    setCustomization({
      ...customization,
      extras: toggleValueInArray(customization.extras, id),
    });
  };

  const handleSelectSingleValue = (
    field: 'theme' | 'backdrop' | 'bounceUnit' | 'bubbleExperience',
    value: string
  ) => {
    setCustomization({
      ...customization,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedPackage) return;

    try {
      setSubmitLoading(true);
      setSubmitMessage(null);

      await bookingService.create({
        customerId: 1,
        packageId: Number(selectedPackage.id),
        category: selectedCategory,
        eventTitle: details.eventTitle,
        eventType: selectedCategory,
        eventDate: details.eventDate,
        startTime: details.startTime || null,
        endTime: details.endTime || null,
        venueName: details.venueName,
        venueAddress: details.venueAddress || null,
        guestCount: Number(details.guestCount || 0),
        specialRequests: details.specialRequests || null,
        discountAmount: 0,
        depositAmount: 0,
        createdBy: null,
        mascots: customization.mascots.map((id) => ({
          itemId: id,
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        })),
        activities: customization.activities.map((id) => ({
          itemId: id,
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        })),
        extras: customization.extras.map((id) => ({
          itemId: id,
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        })),
      });

      setSubmitMessage('Booking submitted successfully.');
      resetFlow();
    } catch (error: any) {
      setSubmitMessage(error.message || 'Failed to submit booking.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 'category') {
      return (
        <BookingCategoryStep
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
      );
    }

    if (currentStep === 'package') {
      return (
        <BookingPackageStep
          packages={packages}
          selectedPackage={selectedPackage}
          isLoading={packagesLoading}
          error={packagesError}
          onSelect={setSelectedPackage}
        />
      );
    }

    if (currentStep === 'customization') {
      return (
        <BookingCustomizationStep
          selectedCategory={selectedCategory}
          config={customizationConfig}
          customization={customization}
          mascots={mascots as any}
          onToggleMascot={handleToggleMascot}
          onToggleActivity={handleToggleActivity}
          onToggleExtra={handleToggleExtra}
          onSelectSingleValue={handleSelectSingleValue}
        />
      );
    }

    if (currentStep === 'details') {
      return <BookingDetailsStep details={details} onChange={handleDetailsChange} />;
    }

    return (
      <BookingReviewStep
        selectedCategory={selectedCategory}
        selectedPackage={selectedPackage}
        customization={customization}
        details={details}
        totalPrice={totalPrice}
      />
    );
  };

  return (
    <section style={pageStyle}>
      <div style={containerStyle}>
        <BookingStepper stepOrder={stepOrder} currentStep={currentStep} />

        <div style={contentGridStyle}>
          <div style={mainPanelStyle}>
            {packagesError && currentStep === 'package' ? (
              <BookingErrorState message={packagesError} />
            ) : (
              renderStepContent()
            )}

            {submitMessage ? <div style={messageBoxStyle}>{submitMessage}</div> : null}
          </div>

          <BookingSummaryCard
            currentStepLabel={currentStepLabel}
            selectedCategory={selectedCategory}
            selectedPackage={selectedPackage}
            totalPrice={totalPrice}
            onBack={currentStep !== 'category' ? goToPreviousStep : undefined}
            onNext={
              currentStep === 'review'
                ? handleSubmit
                : canContinue
                ? goToNextStep
                : undefined
            }
            nextDisabled={currentStep !== 'review' && !canContinue}
            nextLabel={
              currentStep === 'review'
                ? submitLoading
                  ? 'Submitting...'
                  : 'Submit'
                : 'Continue'
            }
          />
        </div>
      </div>
    </section>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f7f4ef',
  padding: '40px 24px 72px',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const contentGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 380px)',
  gap: '28px',
  alignItems: 'start',
};

const mainPanelStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ebe4da',
  borderRadius: '28px',
  padding: '28px',
  boxShadow: '0 22px 45px rgba(15, 23, 42, 0.06)',
};

const messageBoxStyle: React.CSSProperties = {
  marginTop: '20px',
  borderRadius: '16px',
  padding: '14px 16px',
  background: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  fontWeight: 600,
  lineHeight: 1.6,
};