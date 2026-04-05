import type {
  BookingCategoryKey,
  BookingCustomizationConfig,
  BookingCustomizationSelections,
  Mascot,
} from '../../../types';
import BookingEmptyState from './BookingEmptyState';

interface BookingCustomizationStepProps {
  selectedCategory: BookingCategoryKey | null;
  config: BookingCustomizationConfig | null;
  customization: BookingCustomizationSelections;
  mascots?: Mascot[];
  onToggleMascot: (id: number) => void;
  onToggleActivity: (id: number) => void;
  onToggleExtra: (id: number) => void;
  onSelectSingleValue: (
    field: 'theme' | 'backdrop' | 'bounceUnit' | 'bubbleExperience',
    value: string
  ) => void;
}

const decorationThemes = ['Classic', 'Princess', 'Blue & Gold', 'Pink Dream'];
const backdropOptions = ['Standard Backdrop', 'Premium Backdrop', 'Custom Printed Backdrop'];
const bounceUnits = ['Mini Bounce', 'Castle Bounce', 'Premium Bounce Arena'];
const bubbleExperiences = ['Basic Bubble Effect', 'Bubble Machine', 'Bubble Show'];

const activityOptions = [
  { id: 1, label: 'Face Painting' },
  { id: 2, label: 'Kids Games' },
  { id: 3, label: 'Mini Host Animation' },
];

const extraOptions = [
  { id: 1, label: 'Photo Corner' },
  { id: 2, label: 'Props Pack' },
  { id: 3, label: 'Candy Table' },
];

export default function BookingCustomizationStep({
  selectedCategory,
  config,
  customization,
  mascots = [],
  onToggleMascot,
  onToggleActivity,
  onToggleExtra,
  onSelectSingleValue,
}: BookingCustomizationStepProps) {
  if (!selectedCategory || !config) {
    return (
      <BookingEmptyState
        title="Customization unavailable"
        message="Please choose a category and package first."
      />
    );
  }

  return (
    <div>
      <div style={headerStyle}>
        <span style={badgeStyle}>STEP 3 OF 5</span>
        <h2 style={titleStyle}>{config.stepTitle}</h2>
        <p style={textStyle}>
          Adjust the options for this category before moving to event details.
        </p>
      </div>

      {selectedCategory === 'mascots' ? (
        <div style={sectionWrapStyle}>
          <SectionTitle title="Mascot Selection" />
          {!mascots.length ? (
            <BookingEmptyState
              title="No mascots found"
              message="There are currently no mascots available for customization."
            />
          ) : (
            <div style={gridStyle}>
              {mascots.map((mascot) => {
                const isSelected = customization.mascots.includes(Number(mascot.id));

                return (
                  <button
                    key={mascot.id}
                    type="button"
                    onClick={() => onToggleMascot(Number(mascot.id))}
                    style={{
                      ...cardStyle,
                      ...(isSelected ? selectedCardStyle : {}),
                    }}
                  >
                    <div style={cardBodyStyle}>
                      <div style={cardTopStyle}>
                        <h3 style={cardTitleStyle}>
                          {mascot.character_name || mascot.name}
                        </h3>
                        <span
                          style={{
                            ...statusBadgeStyle,
                            ...(isSelected ? selectedBadgeStyle : {}),
                          }}
                        >
                          {isSelected ? 'Selected' : 'Choose'}
                        </span>
                      </div>

                      <p style={cardDescriptionStyle}>
                        {mascot.description || 'Mascot option for your celebration.'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <SectionTitle title="Mascot Add-ons" />
          <OptionGrid
            selectedValues={customization.extras}
            options={extraOptions}
            onToggle={onToggleExtra}
          />
        </div>
      ) : null}

      {selectedCategory === 'decorations' ? (
        <div style={sectionWrapStyle}>
          <SectionTitle title="Theme Style" />
          <SingleSelectGrid
            selectedValue={customization.theme || ''}
            options={decorationThemes}
            onSelect={(value) => onSelectSingleValue('theme', value)}
          />

          <SectionTitle title="Backdrop Setup" />
          <SingleSelectGrid
            selectedValue={customization.backdrop || ''}
            options={backdropOptions}
            onSelect={(value) => onSelectSingleValue('backdrop', value)}
          />

          <SectionTitle title="Decoration Extras" />
          <OptionGrid
            selectedValues={customization.extras}
            options={extraOptions}
            onToggle={onToggleExtra}
          />
        </div>
      ) : null}

      {selectedCategory === 'bounce-bubble' ? (
        <div style={sectionWrapStyle}>
          <SectionTitle title="Bounce Unit" />
          <SingleSelectGrid
            selectedValue={customization.bounceUnit || ''}
            options={bounceUnits}
            onSelect={(value) => onSelectSingleValue('bounceUnit', value)}
          />

          <SectionTitle title="Bubble Experience" />
          <SingleSelectGrid
            selectedValue={customization.bubbleExperience || ''}
            options={bubbleExperiences}
            onSelect={(value) => onSelectSingleValue('bubbleExperience', value)}
          />

          <SectionTitle title="Event Extras" />
          <OptionGrid
            selectedValues={customization.extras}
            options={extraOptions}
            onToggle={onToggleExtra}
          />

          <SectionTitle title="Activities" />
          <OptionGrid
            selectedValues={customization.activities}
            options={activityOptions}
            onToggle={onToggleActivity}
          />
        </div>
      ) : null}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 style={sectionTitleStyle}>{title}</h3>;
}

function SingleSelectGrid({
  selectedValue,
  options,
  onSelect,
}: {
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div style={gridStyle}>
      {options.map((option) => {
        const isSelected = selectedValue === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            style={{
              ...cardStyle,
              ...(isSelected ? selectedCardStyle : {}),
            }}
          >
            <div style={cardBodyStyle}>
              <div style={cardTopStyle}>
                <h3 style={cardTitleStyle}>{option}</h3>
                <span
                  style={{
                    ...statusBadgeStyle,
                    ...(isSelected ? selectedBadgeStyle : {}),
                  }}
                >
                  {isSelected ? 'Selected' : 'Choose'}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function OptionGrid({
  selectedValues,
  options,
  onToggle,
}: {
  selectedValues: number[];
  options: { id: number; label: string }[];
  onToggle: (id: number) => void;
}) {
  return (
    <div style={gridStyle}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            style={{
              ...cardStyle,
              ...(isSelected ? selectedCardStyle : {}),
            }}
          >
            <div style={cardBodyStyle}>
              <div style={cardTopStyle}>
                <h3 style={cardTitleStyle}>{option.label}</h3>
                <span
                  style={{
                    ...statusBadgeStyle,
                    ...(isSelected ? selectedBadgeStyle : {}),
                  }}
                >
                  {isSelected ? 'Selected' : 'Choose'}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '28px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: '999px',
  border: '1px solid rgba(199,146,47,0.3)',
  color: '#c7922f',
  background: 'rgba(255,255,255,0.7)',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.04em',
};

const titleStyle: React.CSSProperties = {
  margin: '20px 0 10px',
  color: '#0f172a',
  fontSize: '38px',
  fontWeight: 800,
};

const textStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '18px',
  lineHeight: 1.7,
};

const sectionWrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: '18px',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '8px 0 0',
  color: '#111827',
  fontSize: '20px',
  fontWeight: 800,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '16px',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e8e0d5',
  borderRadius: '22px',
  padding: '20px',
  textAlign: 'left',
  cursor: 'pointer',
  boxShadow: '0 10px 22px rgba(15, 23, 42, 0.04)',
};

const selectedCardStyle: React.CSSProperties = {
  border: '1px solid #c7922f',
  boxShadow: '0 16px 34px rgba(199, 146, 47, 0.14)',
  transform: 'translateY(-2px)',
};

const cardBodyStyle: React.CSSProperties = {
  display: 'grid',
  gap: '12px',
};

const cardTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '18px',
  fontWeight: 800,
};

const cardDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '15px',
  lineHeight: 1.7,
};

const statusBadgeStyle: React.CSSProperties = {
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

const selectedBadgeStyle: React.CSSProperties = {
  background: '#1f2f4f',
  color: '#ffffff',
};