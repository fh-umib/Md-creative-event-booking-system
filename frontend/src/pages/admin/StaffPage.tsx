import { useEffect, useMemo, useState } from 'react';
import {
  createStaff,
  deleteStaff,
  getAdminStaff,
  updateStaff,
} from '../../services/staffAdminApi';
import type { StaffMember, StaffPayload } from '../../services/staffAdminApi';

const initialForm: StaffPayload = {
  full_name: '',
  role: '',
  bio: '',
  image_url: '',
  email: '',
  phone: '',
  is_active: true,
  display_order: 0,
};

export default function StaffPage() {
  const [members, setMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<StaffPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const isNarrowScreen = window.innerWidth < 1200;

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminStaff();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((item) => {
      const text = `${item.full_name} ${item.role} ${item.email || ''}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [members, search]);

  const totalActive = useMemo(
    () => filteredMembers.filter((item) => item.is_active).length,
    [filteredMembers]
  );

  const handleChange = (
    key: keyof StaffPayload,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (member: StaffMember) => {
    setEditingId(member.id);
    setForm({
      full_name: member.full_name,
      role: member.role,
      bio: member.bio || '',
      image_url: member.image_url || '',
      email: member.email || '',
      phone: member.phone || '',
      is_active: member.is_active,
      display_order: member.display_order,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');

      if (editingId) {
        await updateStaff(editingId, form);
      } else {
        await createStaff(form);
      }

      await loadMembers();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this staff member?');
    if (!confirmed) return;

    try {
      setError('');
      await deleteStaff(id);
      await loadMembers();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

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
            <h3 style={adminStatNumberStyle}>{filteredMembers.length}</h3>
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

      <section style={toolbarWrapStyle}>
        <input
          type="text"
          placeholder="Search team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </section>

      {error ? <div style={errorBoxStyle}>{error}</div> : null}

      <section style={adminSectionStyle}>
        <div
          style={{
            ...adminGridStyle,
            gridTemplateColumns: isNarrowScreen
              ? '1fr'
              : 'minmax(320px, 380px) minmax(0, 1fr)',
          }}
        >
          <div style={adminFormBoxStyle}>
            <p style={adminBoxEyebrowStyle}>
              {editingId ? 'EDIT MEMBER' : 'CREATE MEMBER'}
            </p>
            <h2 style={adminBoxTitleStyle}>
              {editingId ? 'Update Team Member' : 'Add Team Member'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  style={inputStyle}
                  placeholder="Enter full name"
                  value={form.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Role</label>
                <input
                  style={inputStyle}
                  placeholder="Enter role"
                  value={form.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Bio</label>
                <textarea
                  style={textareaStyle}
                  placeholder="Short description"
                  value={form.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Image URL</label>
                <input
                  style={inputStyle}
                  placeholder="Paste image link"
                  value={form.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                />
              </div>

              <div style={formRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle}
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Phone</label>
                  <input
                    style={inputStyle}
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Display Order</label>
                  <input
                    type="number"
                    style={inputStyle}
                    placeholder="1"
                    value={form.display_order}
                    onChange={(e) =>
                      handleChange('display_order', Number(e.target.value))
                    }
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Status</label>
                  <select
                    style={inputStyle}
                    value={form.is_active ? 'active' : 'inactive'}
                    onChange={(e) =>
                      handleChange('is_active', e.target.value === 'active')
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={buttonRowStyle}>
                {editingId ? (
                  <button type="button" style={cancelButtonStyle} onClick={resetForm}>
                    Cancel
                  </button>
                ) : null}

                <button type="submit" style={saveButtonStyle}>
                  {editingId ? 'Update Member' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>

          <div style={adminListBoxStyle}>
            <div style={adminListHeaderStyle}>
              <div>
                <p style={adminBoxEyebrowStyle}>CURRENT TEAM</p>
                <h2 style={adminBoxTitleStyle}>Team Members</h2>
              </div>

              <div style={adminBadgeStyle}>{filteredMembers.length} members</div>
            </div>

            {loading ? (
              <div style={emptyStateStyle}>Loading team members...</div>
            ) : filteredMembers.length === 0 ? (
              <div style={emptyStateStyle}>No team members found.</div>
            ) : (
              <div style={adminCardsGridStyle}>
                {filteredMembers.map((member) => (
                  <article key={member.id} style={adminMemberCardStyle}>
                    <div
                      style={{
                        ...adminMemberImageStyle,
                        backgroundImage: member.image_url
                          ? `linear-gradient(180deg, rgba(17,24,39,0.06) 0%, rgba(17,24,39,0.18) 100%), url(${member.image_url})`
                          : 'linear-gradient(135deg, #f59e0b, #ec4899)',
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

                      <p style={adminMemberBioStyle}>
                        {member.bio || 'No bio provided.'}
                      </p>

                      <div style={adminMemberMetaStyle}>
                        <p style={adminMemberMetaTextStyle}>{member.email || 'No email'}</p>
                        <p style={adminMemberMetaTextStyle}>{member.phone || 'No phone'}</p>
                        <p style={adminMemberMetaTextStyle}>
                          Display order: {member.display_order}
                        </p>
                      </div>

                      <div style={adminActionsStyle}>
                        <button
                          type="button"
                          style={editButtonStyle}
                          onClick={() => handleEdit(member)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          style={deleteButtonStyle}
                          onClick={() => handleDelete(member.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
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

const toolbarWrapStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '18px auto 0',
  padding: '0 24px',
};

const searchInputStyle: React.CSSProperties = {
  width: '320px',
  maxWidth: '100%',
  padding: '14px 16px',
  borderRadius: '14px',
  border: '1px solid #d7dce5',
  outline: 'none',
  fontSize: '15px',
  background: '#ffffff',
  boxSizing: 'border-box',
};

const errorBoxStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '18px auto 0',
  padding: '14px 16px',
  borderRadius: '14px',
  background: '#fff5f5',
  color: '#dc2626',
  border: '1px solid #fecaca',
  fontWeight: 600,
};

const adminSectionStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '32px 24px 72px',
};

const adminGridStyle: React.CSSProperties = {
  display: 'grid',
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
  minWidth: 0,
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

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginTop: '22px',
};

const saveButtonStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  borderRadius: '14px',
  background: '#d99a1d',
  color: '#111827',
  padding: '15px 20px',
  fontWeight: 800,
  fontSize: '16px',
  cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
  border: '1px solid #d7dce5',
  borderRadius: '14px',
  background: '#ffffff',
  color: '#111827',
  padding: '15px 18px',
  fontWeight: 700,
  fontSize: '15px',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center',
  color: '#667085',
  background: '#fafafa',
  borderRadius: '16px',
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
  backgroundColor: '#f5e7cc',
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
  minHeight: '56px',
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