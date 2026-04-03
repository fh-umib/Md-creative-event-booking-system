import { useMemo, useState } from 'react';
import type { CSSProperties, ChangeEvent, FormEvent, ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Crown,
  PartyPopper,
  Phone,
  Puzzle,
  Sparkles,
  UserRound,
} from 'lucide-react';

import { usePackages } from '../../hooks/usePackages';
import { useMascots } from '../../hooks/useMascots';
import { bookingAddOns } from '../../data/bookingAddOns';

import type {
  BookingAddOn,
  BookingDetailsForm,
  BookingStep,
  BookingSummary,
  Mascot,
  Package,
} from '../../types';

const INITIAL_DETAILS: BookingDetailsForm = {
  fullName: '',
  phone: '',
  email: '',
  eventDate: '',
  eventTime: '',
  location: '',
  childName: '',
  childAge: '',
  notes: '',
};

const steps = [
  {
    id: 1 as BookingStep,
    title: 'Package',
    subtitle: 'Choose your plan',
    icon: Crown,
  },
  {
    id: 2 as BookingStep,
    title: 'Mascots',
    subtitle: 'Pick characters',
    icon: UserRound,
  },
  {
    id: 3 as BookingStep,
    title: 'Add-ons',
    subtitle: 'Extra services',
    icon: Puzzle,
  },
  {
    id: 4 as BookingStep,
    title: 'Details',
    subtitle: 'Your info',
    icon: ClipboardList,
  },
];

export default function BookingPage() {
  const { packages, isLoading: packagesLoading, error: packagesError } = usePackages();
  const { mascots, isLoading: mascotsLoading, error: mascotsError } = useMascots();

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedMascotIds, setSelectedMascotIds] = useState<string[]>([]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [details, setDetails] = useState<BookingDetailsForm>(INITIAL_DETAILS);

  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const selectedPackage = useMemo<Package | undefined>(() => {
    return (packages as Package[]).find(
      (item: Package) => String(item.id) === String(selectedPackageId)
    );
  }, [packages, selectedPackageId]);

  const selectedMascots = useMemo<Mascot[]>(() => {
    return (mascots as Mascot[]).filter((item: Mascot) =>
      selectedMascotIds.includes(String(item.id))
    );
  }, [mascots, selectedMascotIds]);

  const selectedAddOns = useMemo<BookingAddOn[]>(() => {
    return bookingAddOns.filter((item: BookingAddOn) =>
      selectedAddOnIds.includes(item.id)
    );
  }, [selectedAddOnIds]);

  const summary = useMemo<BookingSummary>(() => {
    const packagePrice = Number(selectedPackage?.price || 0);
    const mascotsPrice = selectedMascots.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );
    const addOnsPrice = selectedAddOns.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );

    return {
      packagePrice,
      mascotsPrice,
      addOnsPrice,
      total: packagePrice + mascotsPrice + addOnsPrice,
    };
  }, [selectedPackage, selectedMascots, selectedAddOns]);

  const groupedAddOns = useMemo(() => {
    return {
      decorations: bookingAddOns.filter(
        (item: BookingAddOn) => item.category === 'decorations'
      ),
      activities: bookingAddOns.filter(
        (item: BookingAddOn) => item.category === 'activities'
      ),
      photoBooth: bookingAddOns.filter(
        (item: BookingAddOn) => item.category === 'photoBooth'
      ),
    };
  }, []);

  const heroContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return {
          badge: 'STEP 1 OF 4',
          title: 'Choose Your Package',
          text: 'Start by picking the perfect package for your celebration.',
        };
      case 2:
        return {
          badge: 'STEP 2 OF 4',
          title: 'Choose Your Mascots',
          text: 'Add one or more mascot characters to make your event more magical.',
        };
      case 3:
        return {
          badge: 'STEP 3 OF 4',
          title: 'Customize With Add-ons',
          text: 'Enhance your event with decorations, activities, and photo booth experiences.',
        };
      case 4:
        return {
          badge: 'STEP 4 OF 4',
          title: 'Enter Your Event Details',
          text: 'Tell us about your event so we can prepare your booking request properly.',
        };
      default:
        return {
          badge: 'BOOK NOW',
          title: 'Plan Your Event',
          text: 'Build your perfect celebration step by step.',
        };
    }
  }, [currentStep]);

  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      return Boolean(selectedPackageId);
    }

    if (currentStep === 2) {
      return true;
    }

    if (currentStep === 3) {
      return true;
    }

    if (currentStep === 4) {
      return (
        details.fullName.trim() !== '' &&
        details.phone.trim() !== '' &&
        details.eventDate.trim() !== '' &&
        details.eventTime.trim() !== '' &&
        details.location.trim() !== ''
      );
    }

    return false;
  };

  const handleNext = () => {
    setSubmitError('');
    setSubmitSuccess('');

    if (!isCurrentStepValid()) {
      if (currentStep === 1) {
        setSubmitError('Please select a package before continuing.');
      } else if (currentStep === 4) {
        setSubmitError('Please complete all required event details.');
      }
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    setSubmitError('');
    setSubmitSuccess('');

    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const toggleMascot = (id: string | number) => {
    const normalizedId = String(id);

    setSelectedMascotIds((prev) =>
      prev.includes(normalizedId)
        ? prev.filter((item) => item !== normalizedId)
        : [...prev, normalizedId]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleDetailsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = (event: FormEvent) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!isCurrentStepValid()) {
      setSubmitError('Please complete all required event details.');
      return;
    }

    if (!selectedPackageId) {
      setSubmitError('A package is required to create a booking request.');
      setCurrentStep(1);
      return;
    }

    setSubmitSuccess(
      'Your booking request has been prepared successfully. The next step is connecting this form to the backend booking endpoint.'
    );

    console.log('BOOKING PAYLOAD', {
      packageId: selectedPackageId,
      mascotIds: selectedMascotIds,
      addOnIds: selectedAddOnIds,
      details,
      total: summary.total,
      status: 'pending',
    });
  };

  return (
    <>
      <section style={heroSectionStyle}>
        <div style={heroInnerStyle}>
          <span style={heroBadgeStyle}>{heroContent.badge}</span>
          <h1 style={heroTitleStyle}>{heroContent.title}</h1>
          <p style={heroTextStyle}>{heroContent.text}</p>
        </div>
      </section>

      <section style={pageSectionStyle}>
        <div style={stepperWrapStyle}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;

            return (
              <div key={step.id} style={stepItemWrapStyle}>
                <div style={stepItemStyle}>
                  <div
                    style={{
                      ...stepIconStyle,
                      ...(isActive ? stepIconActiveStyle : {}),
                      ...(isComplete ? stepIconCompleteStyle : {}),
                    }}
                  >
                    {isComplete ? <Check size={22} /> : <Icon size={22} />}
                  </div>

                  <div style={stepLabelBoxStyle}>
                    <strong style={stepTitleStyle}>{step.title}</strong>
                    <span style={stepSubtitleStyle}>{step.subtitle}</span>
                  </div>
                </div>

                {index < steps.length - 1 && <div style={stepLineStyle} />}
              </div>
            );
          })}
        </div>

        <div style={contentGridStyle}>
          <div style={mainPanelStyle}>
            {currentStep === 1 && (
              <div>
                {packagesLoading ? (
                  <StateBox
                    title="Loading packages..."
                    text="Please wait while we prepare the available packages."
                  />
                ) : packagesError ? (
                  <StateBox
                    title="Unable to load packages"
                    text={packagesError}
                    tone="error"
                  />
                ) : !(packages as Package[]).length ? (
                  <StateBox
                    title="No Packages Available"
                    text="Check back soon — we're preparing amazing offers."
                  />
                ) : (
                  <div style={cardGridStyle}>
                    {(packages as Package[]).map((item: Package) => {
                      const isSelected =
                        String(selectedPackageId) === String(item.id);

                      return (
                        <button
                          key={String(item.id)}
                          type="button"
                          onClick={() => setSelectedPackageId(String(item.id))}
                          style={{
                            ...selectionCardStyle,
                            ...(isSelected ? selectionCardSelectedStyle : {}),
                          }}
                        >
                          <div
                            style={{
                              ...cardImageStyle,
                              backgroundImage: `url(${item.imageUrl})`,
                            }}
                          />
                          <div style={cardBodyStyle}>
                            <div style={cardTopRowStyle}>
                              <h3 style={cardTitleStyle}>{item.name}</h3>
                              <span style={pricePillStyle}>€{item.price}</span>
                            </div>

                            <p style={cardDescriptionStyle}>
                              {item.description ||
                                'A curated package for memorable celebrations.'}
                            </p>

                            <div style={cardFooterRowStyle}>
                              <span
                                style={{
                                  ...statusBadgeStyle,
                                  ...(isSelected ? selectedBadgeStyle : {}),
                                }}
                              >
                                {isSelected ? 'Selected' : 'Choose package'}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div>
                {mascotsLoading ? (
                  <StateBox
                    title="Loading mascots..."
                    text="Please wait while we prepare the mascot options."
                  />
                ) : mascotsError ? (
                  <StateBox
                    title="Unable to load mascots"
                    text={mascotsError}
                    tone="error"
                  />
                ) : !(mascots as Mascot[]).length ? (
                  <StateBox
                    title="No Mascots Available"
                    text="There are no mascot characters available right now."
                  />
                ) : (
                  <div style={cardGridStyle}>
                    {(mascots as Mascot[]).map((item: Mascot) => {
                      const isSelected = selectedMascotIds.includes(String(item.id));

                      return (
                        <button
                          key={String(item.id)}
                          type="button"
                          onClick={() => toggleMascot(item.id)}
                          style={{
                            ...selectionCardStyle,
                            ...(isSelected ? selectionCardSelectedStyle : {}),
                          }}
                        >
                          <div
                            style={{
                              ...cardImageStyle,
                              backgroundImage: `url(${item.imageUrl})`,
                            }}
                          />
                          <div style={cardBodyStyle}>
                            <div style={cardTopRowStyle}>
                              <h3 style={cardTitleStyle}>{item.name}</h3>
                              <span style={pricePillStyle}>€{item.price}</span>
                            </div>

                            <p style={cardDescriptionStyle}>
                              {item.description ||
                                'A fun mascot option for children’s celebrations.'}
                            </p>

                            <div style={cardFooterRowStyle}>
                              <span
                                style={{
                                  ...statusBadgeStyle,
                                  ...(isSelected ? selectedBadgeStyle : {}),
                                }}
                              >
                                {isSelected ? 'Added to booking' : 'Add mascot'}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div style={addOnSectionsWrapStyle}>
                <AddOnSection
                  title="Decorations"
                  items={groupedAddOns.decorations}
                  selectedIds={selectedAddOnIds}
                  onToggle={toggleAddOn}
                />

                <AddOnSection
                  title="Activities"
                  items={groupedAddOns.activities}
                  selectedIds={selectedAddOnIds}
                  onToggle={toggleAddOn}
                />

                <AddOnSection
                  title="Photo Booth"
                  items={groupedAddOns.photoBooth}
                  selectedIds={selectedAddOnIds}
                  onToggle={toggleAddOn}
                />
              </div>
            )}

            {currentStep === 4 && (
              <form onSubmit={handleSubmitBooking} style={detailsFormStyle}>
                <div style={detailsGridStyle}>
                  <Field
                    label="Full Name *"
                    name="fullName"
                    value={details.fullName}
                    onChange={handleDetailsChange}
                    placeholder="Enter your full name"
                  />
                  <Field
                    label="Phone Number *"
                    name="phone"
                    value={details.phone}
                    onChange={handleDetailsChange}
                    placeholder="+383 4X XXX XXX"
                  />
                  <Field
                    label="Email"
                    name="email"
                    value={details.email}
                    onChange={handleDetailsChange}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Field
                    label="Event Date *"
                    name="eventDate"
                    value={details.eventDate}
                    onChange={handleDetailsChange}
                    type="date"
                  />
                  <Field
                    label="Event Time *"
                    name="eventTime"
                    value={details.eventTime}
                    onChange={handleDetailsChange}
                    type="time"
                  />
                  <Field
                    label="Location *"
                    name="location"
                    value={details.location}
                    onChange={handleDetailsChange}
                    placeholder="Enter event location"
                  />
                  <Field
                    label="Child Name"
                    name="childName"
                    value={details.childName}
                    onChange={handleDetailsChange}
                    placeholder="Optional"
                  />
                  <Field
                    label="Child Age"
                    name="childAge"
                    value={details.childAge}
                    onChange={handleDetailsChange}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Special Notes</label>
                  <textarea
                    name="notes"
                    value={details.notes}
                    onChange={handleDetailsChange}
                    placeholder="Tell us about your theme, requests, or special details..."
                    style={textareaStyle}
                    rows={5}
                  />
                </div>

                {submitSuccess ? (
                  <p style={successMessageStyle}>{submitSuccess}</p>
                ) : null}

                {submitError ? <p style={errorMessageStyle}>{submitError}</p> : null}
              </form>
            )}

            {(submitError || submitSuccess) && currentStep !== 4 ? (
              <div style={{ marginTop: 20 }}>
                {submitSuccess ? (
                  <p style={successMessageStyle}>{submitSuccess}</p>
                ) : null}

                {submitError ? <p style={errorMessageStyle}>{submitError}</p> : null}
              </div>
            ) : null}
          </div>

          <aside style={summaryPanelStyle}>
            <div style={summaryHeaderStyle}>
              <h2 style={summaryTitleStyle}>Booking Summary</h2>
              <span style={summaryStepStyle}>Step {currentStep} of 4</span>
            </div>

            <SummaryBlock
              icon={<Crown size={18} />}
              title="Package"
              value={selectedPackage ? selectedPackage.name : 'No package selected'}
              price={summary.packagePrice}
            />

            <SummaryBlock
              icon={<UserRound size={18} />}
              title="Mascots"
              value={
                selectedMascots.length
                  ? selectedMascots.map((item: Mascot) => item.name).join(', ')
                  : 'No mascot selected'
              }
              price={summary.mascotsPrice}
            />

            <SummaryBlock
              icon={<Sparkles size={18} />}
              title="Add-ons"
              value={
                selectedAddOns.length
                  ? selectedAddOns.map((item: BookingAddOn) => item.title).join(', ')
                  : 'No add-ons selected'
              }
              price={summary.addOnsPrice}
            />

            <div style={totalBoxStyle}>
              <span style={totalLabelStyle}>Total</span>
              <strong style={totalValueStyle}>€{summary.total}</strong>
            </div>

            <div style={summaryActionsStyle}>
              {currentStep > 1 ? (
                <button type="button" onClick={handleBack} style={secondaryButtonStyle}>
                  <ArrowLeft size={18} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    ...primaryButtonStyle,
                    ...(isCurrentStepValid() ? {} : disabledButtonStyle),
                  }}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleSubmitBooking({
                      preventDefault: () => {},
                    } as FormEvent)
                  }
                  style={{
                    ...primaryButtonStyle,
                    ...(isCurrentStepValid() ? {} : disabledButtonStyle),
                  }}
                >
                  Submit Booking
                  <PartyPopper size={18} />
                </button>
              )}
            </div>

            <div style={noticeBoxStyle}>
              <CalendarDays size={18} />
              <p style={noticeTextStyle}>
                June, July, August, and September are peak season months. Please
                book at least 1 week in advance.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function AddOnSection({
  title,
  items,
  selectedIds,
  onToggle,
}: {
  title: string;
  items: BookingAddOn[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div style={addOnSectionStyle}>
      <h3 style={addOnTitleStyle}>{title}</h3>

      <div style={cardGridStyle}>
        {items.map((item: BookingAddOn) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              style={{
                ...selectionCardStyle,
                ...(isSelected ? selectionCardSelectedStyle : {}),
              }}
            >
              <div
                style={{
                  ...cardImageStyle,
                  backgroundImage: `url(${item.imageUrl})`,
                }}
              />
              <div style={cardBodyStyle}>
                <div style={cardTopRowStyle}>
                  <h3 style={cardTitleStyle}>{item.title}</h3>
                  <span style={pricePillStyle}>€{item.price}</span>
                </div>

                <p style={cardDescriptionStyle}>{item.description}</p>

                <div style={cardFooterRowStyle}>
                  <span
                    style={{
                      ...statusBadgeStyle,
                      ...(isSelected ? selectedBadgeStyle : {}),
                    }}
                  >
                    {isSelected ? 'Added to booking' : 'Add to event'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  const Icon =
    name === 'fullName'
      ? UserRound
      : name === 'phone'
      ? Phone
      : name === 'eventDate'
      ? CalendarDays
      : undefined;

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={fieldWrapStyle}>
        {Icon ? <Icon size={18} style={{ color: '#6b7280' }} /> : null}
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          style={inputStyle}
        />
      </div>
    </div>
  );
}

function SummaryBlock({
  icon,
  title,
  value,
  price,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  price: number;
}) {
  return (
    <div style={summaryBlockStyle}>
      <div style={summaryBlockTopStyle}>
        <div style={summaryBlockIconStyle}>{icon}</div>
        <div>
          <strong style={summaryBlockTitleStyle}>{title}</strong>
          <p style={summaryBlockValueStyle}>{value}</p>
        </div>
      </div>

      <span style={summaryBlockPriceStyle}>€{price}</span>
    </div>
  );
}

function StateBox({
  title,
  text,
  tone = 'neutral',
}: {
  title: string;
  text: string;
  tone?: 'neutral' | 'error';
}) {
  return (
    <div
      style={{
        ...stateBoxStyle,
        ...(tone === 'error'
          ? {
              border: '1px solid #fecaca',
              background: '#fff1f2',
            }
          : {}),
      }}
    >
      <h3 style={stateTitleStyle}>{title}</h3>
      <p style={stateTextStyle}>{text}</p>
    </div>
  );
}

const heroSectionStyle: CSSProperties = {
  background:
    'radial-gradient(circle at center, rgba(43,56,84,0.95) 0%, rgba(29,41,68,1) 100%)',
  padding: '80px 24px 72px',
};

const heroInnerStyle: CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  textAlign: 'center',
};

const heroBadgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 18px',
  borderRadius: '999px',
  border: '1px solid rgba(232,174,57,0.35)',
  color: '#e8ae39',
  background: 'rgba(255,255,255,0.04)',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.04em',
};

const heroTitleStyle: CSSProperties = {
  margin: '28px 0 18px',
  color: '#f8f5f0',
  fontSize: 'clamp(42px, 6vw, 78px)',
  lineHeight: 1.02,
  fontWeight: 700,
};

const heroTextStyle: CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: '#d1d5db',
  fontSize: 'clamp(18px, 2vw, 22px)',
  lineHeight: 1.7,
};

const pageSectionStyle: CSSProperties = {
  background: '#f7f4ef',
  padding: '44px 24px 72px',
};

const stepperWrapStyle: CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto 34px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '18px',
  alignItems: 'center',
};

const stepItemWrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const stepItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  minWidth: '90px',
};

const stepIconStyle: CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#ece7df',
  color: '#677086',
  border: '1px solid #e5dfd6',
  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
};

const stepIconActiveStyle: CSSProperties = {
  background: '#1f2f4f',
  color: '#ffffff',
  border: '1px solid rgba(232,174,57,0.45)',
  boxShadow: '0 16px 30px rgba(31, 47, 79, 0.22)',
};

const stepIconCompleteStyle: CSSProperties = {
  background: '#0f766e',
  color: '#ffffff',
  border: '1px solid #0f766e',
};

const stepLabelBoxStyle: CSSProperties = {
  textAlign: 'center',
};

const stepTitleStyle: CSSProperties = {
  display: 'block',
  color: '#1f2937',
  fontSize: '18px',
  marginBottom: '4px',
};

const stepSubtitleStyle: CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
};

const stepLineStyle: CSSProperties = {
  flex: 1,
  height: '2px',
  background: '#e6dfd5',
};

const contentGridStyle: CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 380px)',
  gap: '28px',
  alignItems: 'start',
};

const mainPanelStyle: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #ebe4da',
  borderRadius: '28px',
  padding: '28px',
  boxShadow: '0 22px 45px rgba(15, 23, 42, 0.06)',
};

const cardGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '20px',
};

const selectionCardStyle: CSSProperties = {
  background: '#fff',
  border: '1px solid #e8e0d5',
  borderRadius: '22px',
  overflow: 'hidden',
  cursor: 'pointer',
  textAlign: 'left',
  padding: 0,
  boxShadow: '0 10px 22px rgba(15, 23, 42, 0.04)',
  transition: 'all 0.2s ease',
};

const selectionCardSelectedStyle: CSSProperties = {
  border: '1px solid #e8ae39',
  boxShadow: '0 16px 34px rgba(232, 174, 57, 0.16)',
  transform: 'translateY(-2px)',
};

const cardImageStyle: CSSProperties = {
  height: '180px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const cardBodyStyle: CSSProperties = {
  padding: '18px',
};

const cardTopRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '12px',
};

const cardTitleStyle: CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '20px',
  lineHeight: 1.25,
};

const pricePillStyle: CSSProperties = {
  flexShrink: 0,
  borderRadius: '999px',
  background: '#f8f3e8',
  color: '#a16207',
  fontWeight: 700,
  fontSize: '14px',
  padding: '8px 12px',
};

const cardDescriptionStyle: CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.7,
  fontSize: '15px',
  minHeight: '52px',
};

const cardFooterRowStyle: CSSProperties = {
  marginTop: '16px',
};

const statusBadgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 12px',
  borderRadius: '999px',
  background: '#f3f4f6',
  color: '#4b5563',
  fontSize: '13px',
  fontWeight: 700,
};

const selectedBadgeStyle: CSSProperties = {
  background: '#1f2f4f',
  color: '#ffffff',
};

const addOnSectionsWrapStyle: CSSProperties = {
  display: 'grid',
  gap: '30px',
};

const addOnSectionStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const addOnTitleStyle: CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '24px',
};

const summaryPanelStyle: CSSProperties = {
  position: 'sticky',
  top: '100px',
  background: '#ffffff',
  border: '1px solid #ebe4da',
  borderRadius: '28px',
  padding: '24px',
  boxShadow: '0 22px 45px rgba(15, 23, 42, 0.08)',
};

const summaryHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '18px',
};

const summaryTitleStyle: CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '24px',
};

const summaryStepStyle: CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 600,
};

const summaryBlockStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '12px',
  padding: '16px 0',
  borderBottom: '1px solid #eee6dc',
};

const summaryBlockTopStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
};

const summaryBlockIconStyle: CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f5efe4',
  color: '#a16207',
  flexShrink: 0,
};

const summaryBlockTitleStyle: CSSProperties = {
  display: 'block',
  color: '#1f2937',
  marginBottom: '6px',
};

const summaryBlockValueStyle: CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.6,
  fontSize: '14px',
};

const summaryBlockPriceStyle: CSSProperties = {
  color: '#111827',
  fontWeight: 700,
  fontSize: '15px',
};

const totalBoxStyle: CSSProperties = {
  marginTop: '20px',
  padding: '20px',
  borderRadius: '20px',
  background: '#f8f4ed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const totalLabelStyle: CSSProperties = {
  color: '#4b5563',
  fontWeight: 700,
  fontSize: '15px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const totalValueStyle: CSSProperties = {
  color: '#111827',
  fontSize: '34px',
};

const summaryActionsStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
  marginTop: '20px',
};

const primaryButtonStyle: CSSProperties = {
  border: 'none',
  borderRadius: '18px',
  padding: '15px 18px',
  background: '#1f2f4f',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '16px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};

const secondaryButtonStyle: CSSProperties = {
  border: '1px solid #d8d2c8',
  borderRadius: '18px',
  padding: '15px 18px',
  background: '#ffffff',
  color: '#111827',
  fontWeight: 700,
  fontSize: '16px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};

const disabledButtonStyle: CSSProperties = {
  background: '#9ca3af',
  cursor: 'not-allowed',
};

const noticeBoxStyle: CSSProperties = {
  marginTop: '20px',
  borderRadius: '18px',
  background: '#fff8eb',
  border: '1px solid #f4dfb2',
  padding: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  color: '#a16207',
};

const noticeTextStyle: CSSProperties = {
  margin: 0,
  lineHeight: 1.6,
  fontSize: '14px',
};

const detailsFormStyle: CSSProperties = {
  display: 'grid',
  gap: '18px',
};

const detailsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px',
};

const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  color: '#374151',
  fontWeight: 700,
  fontSize: '14px',
};

const fieldWrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  border: '1px solid #d8d2c8',
  borderRadius: '16px',
  padding: '0 14px',
  background: '#fff',
};

const inputStyle: CSSProperties = {
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  padding: '14px 0',
  fontSize: '15px',
  color: '#111827',
};

const textareaStyle: CSSProperties = {
  width: '100%',
  border: '1px solid #d8d2c8',
  outline: 'none',
  borderRadius: '18px',
  background: '#fff',
  padding: '14px 16px',
  fontSize: '15px',
  color: '#111827',
  resize: 'vertical',
  fontFamily: 'inherit',
};

const successMessageStyle: CSSProperties = {
  margin: 0,
  borderRadius: '16px',
  padding: '14px 16px',
  background: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  fontWeight: 600,
  lineHeight: 1.6,
};

const errorMessageStyle: CSSProperties = {
  margin: 0,
  borderRadius: '16px',
  padding: '14px 16px',
  background: '#fff1f2',
  border: '1px solid #fecdd3',
  color: '#be123c',
  fontWeight: 600,
  lineHeight: 1.6,
};

const stateBoxStyle: CSSProperties = {
  borderRadius: '24px',
  border: '1px solid #ebe4da',
  background: '#fbfaf7',
  padding: '40px 24px',
  textAlign: 'center',
};

const stateTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  color: '#111827',
  fontSize: '28px',
};

const stateTextStyle: CSSProperties = {
  margin: 0,
  color: '#6b7280',
  lineHeight: 1.7,
  maxWidth: '560px',
  marginInline: 'auto',
};