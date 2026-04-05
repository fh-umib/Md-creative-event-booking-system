import type { BookingFlowStepKey } from '../../../types';

interface BookingStepperProps {
  stepOrder: BookingFlowStepKey[];
  currentStep: BookingFlowStepKey;
}

const stepLabels: Record<BookingFlowStepKey, string> = {
  category: 'Category',
  package: 'Package',
  customization: 'Customization',
  details: 'Details',
  review: 'Review',
};

export default function BookingStepper({
  stepOrder,
  currentStep,
}: BookingStepperProps) {
  const currentIndex = stepOrder.findIndex((step) => step === currentStep);

  return (
    <div style={wrapperStyle}>
      {stepOrder.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = index < currentIndex;

        return (
          <div key={step} style={stepItemWrapStyle}>
            <div style={stepItemStyle}>
              <div
                style={{
                  ...stepCircleStyle,
                  ...(isActive ? activeStepCircleStyle : {}),
                  ...(isCompleted ? completedStepCircleStyle : {}),
                }}
              >
                {index + 1}
              </div>

              <div style={stepLabelStyle}>{stepLabels[step]}</div>
            </div>

            {index < stepOrder.length - 1 ? <div style={stepLineStyle} /> : null}
          </div>
        );
      })}
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  gap: '14px',
  alignItems: 'center',
  marginBottom: '28px',
};

const stepItemWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const stepItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  minWidth: '84px',
};

const stepCircleStyle: React.CSSProperties = {
  width: '54px',
  height: '54px',
  borderRadius: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#ece7df',
  color: '#677086',
  border: '1px solid #e5dfd6',
  fontWeight: 800,
  fontSize: '16px',
};

const activeStepCircleStyle: React.CSSProperties = {
  background: '#1f2f4f',
  color: '#ffffff',
  border: '1px solid rgba(199,146,47,0.5)',
  boxShadow: '0 14px 28px rgba(31, 47, 79, 0.16)',
};

const completedStepCircleStyle: React.CSSProperties = {
  background: '#0f766e',
  color: '#ffffff',
  border: '1px solid #0f766e',
};

const stepLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#334155',
  textAlign: 'center',
};

const stepLineStyle: React.CSSProperties = {
  flex: 1,
  height: '2px',
  background: '#e6dfd5',
};