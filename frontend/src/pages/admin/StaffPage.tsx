import { useMemo, useState } from 'react';
import type { StaffMember } from '../../types/staff';

const demoStaff: StaffMember[] = [
  {
    id: 1,
    full_name: 'Arta Krasniqi',
    role: 'Event Coordinator',
    bio: 'Coordinates premium events and ensures smooth client communication.',
    image_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    email: 'arta@mdcreative.com',
    phone: '+383 44 111 111',
    is_active: true,
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    full_name: 'Liridon Berisha',
    role: 'Mascot Performer',
    bio: 'Brings energy and unforgettable moments to every children’s celebration.',
    image_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    email: 'liridon@mdcreative.com',
    phone: '+383 44 222 222',
    is_active: true,
    display_order: 2,
    created_at: '',
    updated_at: '',
  },
];

export default function StaffAdminPage() {
  const [members] = useState<StaffMember[]>(demoStaff);

  const totalActive = useMemo(
    () => members.filter((item) => item.is_active).length,
    [members]
  );

  return (
    <main style={adminPageStyle}>
      <section style={adminHeroStyle}>
        <div style={adminHeroOverlayStyle} />

        <div style={adminHeroContainerStyle}>
          <p style={adminEyebrowStyle}>ADMIN PANEL</p>
          <h1 style={adminTitleStyle}>Team Management</h1>
          <p style={adminTextStyle}>
            Add, edit, and organize team members for the public Our Team page.
          </p>
        </div>
      </section>

      <section style={adminStatsSectionStyle}>
        <div style={adminStatsCardStyle}>
          <div style={adminStatItemStyle}>
            <div style={adminStatIconStyle}>◌</div>
            <h3 style={adminStatNumberStyle}>{members.length}</h3>
            <p style={adminStatLabelStyle}>Total Members</p>
          </div>

          <div style={adminStatItemStyle}>
            <div style={adminStatIconStyle}>✓</div>
            <h3 style={adminStatNumberStyle}>{totalActive}</h3>
            <p style={adminStatLabelStyle}>Active Members</p>
          </div>

          <div style={adminStatItemStyle}>
            <div style={adminStatIconStyle}>⌘</div>
            <h3 style={adminStatNumberStyle}>{members.length}</h3>
            <p style={adminStatLabelStyle}>Ready For Display</p>
          </div>
        </div>
      </section>

      <section style={adminSectionStyle}>
        <div style={adminGridStyle}>
          <div style={adminFormBoxStyle}>
            <p style={adminBoxEyebrowStyle}>CREATE MEMBER</p>
            <h2 style={adminBoxTitleStyle}>Add Team Member</h2>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} placeholder="Enter full name" />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Role</label>
              <input style={inputStyle} placeholder="Enter role" />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Bio</label>
              <textarea style={textareaStyle} placeholder="Short description" />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} placeholder="Paste image link" />
            </div>

            <div style={formRowStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} placeholder="Email address" />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} placeholder="Phone number" />
              </div>
            </div>

            <div style={formRowStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Display Order</label>
                <input style={inputStyle} placeholder="1" />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle as React.CSSProperties}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <button style={saveButtonStyle}>Save Member</button>
          </div>

          <div style={adminListBoxStyle}>
            <div style={adminListHeaderStyle}>
              <div>
                <p style={adminBoxEyebrowStyle}>CURRENT TEAM</p>
                <h2 style={adminBoxTitleStyle}>Team Members</h2>
              </div>

              <div style={adminBadgeStyle}>{members.length} members</div>
            </div>

            <div style={adminCardsGridStyle}>
              {members.map((member) => (
                <article key={member.id} style={adminMemberCardStyle}>
                  <div
                    style={{
                      ...adminMemberImageStyle,
                      backgroundImage: `linear-gradient(180deg, rgba(17,24,39,0.06) 0%, rgba(17,24,39,0.18) 100%), url(${member.image_url})`,
                    }}
                  />

                  <div style={adminMemberContentStyle}>
                    <div style={adminMemberTopStyle}>
                      <div>
                        <h3 style={adminMemberNameStyle}>{member.full_name}</h3>
                        <p style={adminMemberRoleStyle}>{member.role}</p>
                      </div>

                      <span style={member.is_active ? activeBadgeStyle : inactiveBadgeStyle}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p style={adminMemberBioStyle}>{member.bio}</p>

                    <div style={adminMemberMetaStyle}>
                      <p style={adminMemberMetaTextStyle}>{member.email}</p>
                      <p style={adminMemberMetaTextStyle}>{member.phone}</p>
                      <p style={adminMemberMetaTextStyle}>
                        Display order: {member.display_order}
                      </p>
                    </div>

                    <div style={adminActionsStyle}>
                      <button style={editButtonStyle}>Edit</button>
                      <button style={deleteButtonStyle}>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const adminPageStyle: React.CSSProperties = {
  background: '#f7f4ef',
  minHeight: '100vh',
};

const adminHeroStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '360px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px 24px 90px',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const adminHeroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.68) 55%, rgba(247,244,239,0.95) 100%)',
};

const adminHeroContainerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '980px',
  margin: '0 auto',
  textAlign: 'center',
};

const adminEyebrowStyle: React.CSSProperties = {
  margin: '0 0 16px',
  color: '#ffffff',
  fontSize: '14px',
  letterSpacing: '0.16em',
  fontWeight: 600,
};

const adminTitleStyle: React.CSSProperties = {
  margin: '0 0 14px',
  color: '#ffffff',
  fontSize: 'clamp(38px, 5vw, 66px)',
  lineHeight: 1.04,
  fontWeight: 800,
};

const adminTextStyle: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.9)',
  fontSize: '18px',
  lineHeight: 1.7,
};

const adminStatsSectionStyle: React.CSSProperties = {
  position: 'relative',
  marginTop: '-42px',
  padding: '0 24px',
};

const adminStatsCardStyle: React.CSSProperties = {
  maxWidth: '860px',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '22px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  padding: '28px 20px',
};

const adminStatItemStyle: React.CSSProperties = {
  textAlign: 'center',
};

const adminStatIconStyle: React.CSSProperties = {
  marginBottom: '8px',
  color: '#d99a1d',
  fontSize: '22px',
};

const adminStatNumberStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: 'clamp(28px, 3vw, 44px)',
  fontWeight: 800,
};

const adminStatLabelStyle: React.CSSProperties = {
  margin: 0,
  color: '#667085',
  fontSize: '16px',
};

const adminSectionStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '72px 24px',
};

const adminGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '380px 1fr',
  gap: '24px',
  alignItems: 'start',
};

const adminFormBoxStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
};

const adminListBoxStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
};

const adminBoxEyebrowStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#d99a1d',
  fontSize: '13px',
  letterSpacing: '0.14em',
  fontWeight: 700,
};

const adminBoxTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#111827',
  fontSize: '28px',
  fontWeight: 800,
};

const formGroupStyle: React.CSSProperties = {
  marginTop: '18px',
};

const formRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  color: '#344054',
  fontSize: '14px',
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 14px',
  borderRadius: '14px',
  border: '1px solid #d7dce5',
  outline: 'none',
  fontSize: '15px',
  color: '#111827',
  background: '#ffffff',
  boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: '120px',
  resize: 'vertical',
};

const saveButtonStyle: React.CSSProperties = {
  marginTop: '22px',
  width: '100%',
  border: 'none',
  borderRadius: '14px',
  background: '#d99a1d',
  color: '#111827',
  padding: '15px 20px',
  fontWeight: 800,
  fontSize: '16px',
  cursor: 'pointer',
};

const adminListHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
};

const adminBadgeStyle: React.CSSProperties = {
  padding: '10px 14px',
  background: '#f8f2e6',
  color: '#9a6b09',
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 800,
};

const adminCardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '20px',
};

const adminMemberCardStyle: React.CSSProperties = {
  border: '1px solid #eceff4',
  borderRadius: '18px',
  overflow: 'hidden',
  background: '#ffffff',
};

const adminMemberImageStyle: React.CSSProperties = {
  minHeight: '220px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const adminMemberContentStyle: React.CSSProperties = {
  padding: '18px',
};

const adminMemberTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  alignItems: 'start',
};

const adminMemberNameStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: '24px',
  fontWeight: 800,
};

const adminMemberRoleStyle: React.CSSProperties = {
  margin: 0,
  color: '#d99a1d',
  fontSize: '14px',
  fontWeight: 800,
  letterSpacing: '0.04em',
};

const adminMemberBioStyle: React.CSSProperties = {
  margin: '14px 0',
  color: '#667085',
  fontSize: '14px',
  lineHeight: 1.8,
};

const adminMemberMetaStyle: React.CSSProperties = {
  paddingTop: '12px',
  borderTop: '1px solid #eceff4',
};

const adminMemberMetaTextStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#475467',
  fontSize: '13px',
  lineHeight: 1.6,
};

const activeBadgeStyle: React.CSSProperties = {
  padding: '8px 12px',
  background: '#ecfdf3',
  color: '#067647',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
};

const inactiveBadgeStyle: React.CSSProperties = {
  padding: '8px 12px',
  background: '#f2f4f7',
  color: '#667085',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
};

const adminActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '16px',
};

const editButtonStyle: React.CSSProperties = {
  flex: 1,
  border: '1px solid #d7dce5',
  borderRadius: '12px',
  background: '#ffffff',
  color: '#111827',
  padding: '12px 14px',
  fontWeight: 700,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  flex: 1,
  border: '1px solid #fecaca',
  borderRadius: '12px',
  background: '#fff5f5',
  color: '#dc2626',
  padding: '12px 14px',
  fontWeight: 700,
  cursor: 'pointer',
};