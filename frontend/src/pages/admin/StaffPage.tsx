import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import {
  createStaff,
  deleteStaff,
  getAdminStaff,
  updateStaff,
} from '../../services/staffAdminApi';
import type { StaffMember, StaffPayload } from '../../services/staffAdminApi';

type PublicStaff = {
  full_name: string;
  role: string;
  image_url: string;
  bio: string;
  tag: string;
  display_order: number;
};

type DisplayStaff = {
  id: number;
  full_name: string;
  role: string;
  image_url: string;
  bio: string;
  tag: string;
  email?: string | null;
  phone?: string | null;
  display_order: number;
  is_active: boolean;
  source: 'admin' | 'public';
  adminItem?: StaffMember;
};

const publicStaff: PublicStaff[] = [
  {
    full_name: 'Rinor Hyseni',
    role: 'Themelues & Organizator Kryesor',
    image_url: '/images/team/rinor-hyseni.png',
    tag: 'Themelues',
    display_order: 1,
    bio: 'Rinori është një nga themeluesit e MD Creative dhe ndihmon në udhëheqjen e organizimit kryesor, planifikimit, përgjegjësive dhe drejtimit të përgjithshëm të kompanisë.',
  },
  {
    full_name: 'Elmonda Hyseni',
    role: 'Bashkëthemeluese & Udhëheqëse e Dekorimeve',
    image_url: '/images/team/elmonda-hyseni.png',
    tag: 'Dekorime',
    display_order: 2,
    bio: 'Elmonda është një nga personat kryesorë pas MD Creative dhe udhëheq punën e dekorimeve me kreativitet, kujdes dhe vëmendje ndaj çdo detaji.',
  },
  {
    full_name: 'Flutura Hyseni',
    role: 'Punëtore Kryesore & Editore Kreative e Medias',
    image_url: '/images/team/flutura-hyseni.png',
    tag: 'Punëtore Kryesore',
    display_order: 3,
    bio: 'Flutura është një nga punëtoret kyçe të MD Creative, përgjegjëse për shumë detyra gjatë eventeve dhe gjithashtu e përfshirë në editimin e videove dhe përmbajtjen kreative për faqen.',
  },
  {
    full_name: 'Tringa Hyseni',
    role: 'Punëtore Kryesore e Eventeve & Performuese me Maskota',
    image_url: '/images/team/tringa-hyseni.png',
    tag: 'Maskota',
    display_order: 4,
    bio: 'Tringa është një nga anëtaret kryesore të ekipit, veçanërisht e përfshirë në performancat me maskota dhe argëtimin e fëmijëve gjatë eventeve të ndryshme.',
  },
  {
    full_name: 'Mali Buliqi',
    role: 'Shofer Kryesor & Punëtor Eventesh',
    image_url: '/images/team/mali-buliqi.png',
    tag: 'Shofer Kryesor',
    display_order: 5,
    bio: 'Mali është shoferi kryesor dhe një nga punëtorët kyç të eventeve, duke ndihmuar me transport, montim, organizim dhe mbështetje gjatë eventeve.',
  },
  {
    full_name: 'Denis Cej',
    role: 'Shofer & Punëtor Afatgjatë i Ekipit',
    image_url: '/images/team/denis-cej.png',
    tag: 'Shofer',
    display_order: 6,
    bio: 'Denisi është një punëtor afatgjatë i ekipit, i cili ndihmon me transport, përgatitje të eventeve, montim dhe përgjegjësi të ndryshme gjatë festave.',
  },
  {
    full_name: 'Elton Shyti',
    role: 'Punëtor Mbështetës i Eventeve',
    image_url: '/images/team/elton-shyti.png',
    tag: 'Mbështetje',
    display_order: 7,
    bio: 'Eltoni është një punëtor i përkushtuar në mbështetjen e eventeve, i cili ndihmon me organizim, përgatitje, montim dhe sigurohet që gjithçka të shkojë siç duhet.',
  },
  {
    full_name: 'Altina Krasniqi',
    role: 'Asistente e Dekorimeve & Punëtore Eventesh',
    image_url: '/images/team/altina-krasniqi.png',
    tag: 'Dekorime',
    display_order: 8,
    bio: 'Altina ndihmon Elmonden me dekorimet dhe gjithashtu mbështet ekipin në detyra të ndryshme të eventeve, duke sjellë kujdes dhe përkushtim në punë.',
  },
];

const initialForm: StaffPayload = {
  full_name: '',
  role: '',
  bio: '',
  image_url: '',
  email: '',
  phone: '',
  display_order: 1,
  is_active: true,
};

function normalize(value?: string | null) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Të gjithë');
  const [form, setForm] = useState<StaffPayload>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadStaff = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getAdminStaff();
      setStaff(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Stafi nuk mund të ngarkohet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const displayStaff = useMemo<DisplayStaff[]>(() => {
    return publicStaff.map((publicItem, index) => {
      const publicKey = normalize(publicItem.full_name);

      const matchedAdmin = staff.find((adminItem) => normalize(adminItem.full_name) === publicKey);

      if (matchedAdmin) {
        return {
          id: matchedAdmin.id,
          full_name: matchedAdmin.full_name || publicItem.full_name,
          role: matchedAdmin.role || publicItem.role,
          bio: matchedAdmin.bio || publicItem.bio,
          image_url: matchedAdmin.image_url || publicItem.image_url,
          tag: publicItem.tag,
          email: matchedAdmin.email,
          phone: matchedAdmin.phone,
          display_order: matchedAdmin.display_order || publicItem.display_order,
          is_active: Boolean(matchedAdmin.is_active),
          source: 'admin' as const,
          adminItem: matchedAdmin,
        };
      }

      return {
        id: -(index + 1),
        full_name: publicItem.full_name,
        role: publicItem.role,
        bio: publicItem.bio,
        image_url: publicItem.image_url,
        tag: publicItem.tag,
        email: '',
        phone: '',
        display_order: publicItem.display_order,
        is_active: true,
        source: 'public' as const,
      };
    });
  }, [staff]);

  const roleOptions = useMemo(() => {
    const tags = Array.from(new Set(displayStaff.map((item) => item.tag).filter(Boolean)));
    return ['Të gjithë', ...tags];
  }, [displayStaff]);

  const filteredStaff = useMemo(() => {
    const value = search.trim().toLowerCase();

    return displayStaff
      .filter((member) => {
        const text = `${member.full_name} ${member.role} ${member.tag} ${member.bio}`.toLowerCase();

        const matchesSearch = !value || text.includes(value);
        const matchesRole = roleFilter === 'Të gjithë' || member.tag === roleFilter;

        return matchesSearch && matchesRole;
      })
      .sort((a, b) => a.display_order - b.display_order);
  }, [displayStaff, search, roleFilter]);

  const stats = useMemo(() => {
    const active = displayStaff.filter((item) => item.is_active).length;
    const connected = displayStaff.filter((item) => item.source === 'admin').length;
    const publicOnly = displayStaff.filter((item) => item.source === 'public').length;

    return {
      total: displayStaff.length,
      active,
      connected,
      publicOnly,
    };
  }, [displayStaff]);

  const roleChart = useMemo(() => {
    const grouped = displayStaff.reduce<Record<string, number>>((acc, item) => {
      acc[item.tag] = (acc[item.tag] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count);
  }, [displayStaff]);

  const maxRoleCount = Math.max(...roleChart.map((item) => item.count), 1);

  const handleChange = (key: keyof StaffPayload, value: string | number | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (member: DisplayStaff) => {
    if (member.source === 'admin' && member.adminItem) {
      setEditingId(member.adminItem.id);
    } else {
      setEditingId(null);
    }

    setForm({
      full_name: member.full_name,
      role: member.role,
      bio: member.bio,
      image_url: member.image_url,
      email: member.email || '',
      phone: member.phone || '',
      display_order: Number(member.display_order || 1),
      is_active: Boolean(member.is_active),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      if (editingId) {
        await updateStaff(editingId, form);
      } else {
        await createStaff(form);
      }

      await loadStaff();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ruajtja e stafit dështoi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (member: DisplayStaff) => {
    if (member.source !== 'admin' || !member.adminItem) {
      window.alert('Ky person është pjesë e ekipit publik. Për ta larguar nga public page duhet të hiqet nga OurTeamPage.');
      return;
    }

    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë anëtar nga admini?');

    if (!confirmed) return;

    try {
      setError('');
      await deleteStaff(member.adminItem.id);
      await loadStaff();

      if (editingId === member.adminItem.id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fshirja e stafit dështoi.');
    }
  };

  const activeStyle = {
    '--active': `${stats.total ? Math.round((stats.active / stats.total) * 360) : 0}deg`,
  } as CSSProperties;

  return (
    <>
      <style>{`
        @keyframes staffSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .staff-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .staff-hero {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.24), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          padding: 26px;
          color: #ffffff;
          box-shadow: 0 12px 34px rgba(26,18,11,.14);
        }

        .staff-hero::after {
          content: "TEAM";
          position: absolute;
          right: 24px;
          bottom: -24px;
          font-size: clamp(70px, 11vw, 138px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .staff-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .staff-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .staff-title {
          margin: 0;
          font-size: clamp(26px, 3.4vw, 42px);
          line-height: 1.05;
          font-weight: 950;
        }

        .staff-title span {
          color: #d4911e;
          font-style: italic;
        }

        .staff-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .staff-hero-card {
          min-width: 230px;
          border-radius: 20px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 15px;
          backdrop-filter: blur(12px);
        }

        .staff-hero-card strong {
          display: block;
          color: #ffffff;
          font-size: 24px;
          font-weight: 950;
          margin-bottom: 4px;
        }

        .staff-hero-card span {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.45;
        }

        .staff-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) 190px auto;
          gap: 10px;
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .staff-search,
        .staff-select {
          height: 42px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 15px;
          font-size: 13px;
          outline: none;
          min-width: 0;
        }

        .staff-search:focus,
        .staff-select:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .staff-refresh {
          height: 42px;
          padding: 0 17px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
        }

        .staff-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(150px, 1fr));
          gap: 12px;
        }

        .staff-stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .staff-stat-label {
          margin: 0 0 10px;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 750;
        }

        .staff-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 23px;
          font-weight: 950;
        }

        .staff-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, .75fr);
          gap: 14px;
        }

        .staff-panel {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .staff-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .staff-panel-text {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .staff-role-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
        }

        .staff-role-item {
          border-radius: 14px;
          border: 1px solid #f3eadc;
          background: #fffaf2;
          padding: 12px;
        }

        .staff-role-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
        }

        .staff-role-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .staff-role-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .staff-ring-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .staff-ring {
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: conic-gradient(#c8841a 0deg var(--active), #f1dfc5 var(--active) 360deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .staff-ring-inner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #fffdf8;
          border: 1px solid #eadfce;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .staff-ring-number {
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
        }

        .staff-ring-label {
          color: #7a6a52;
          font-size: 10px;
          font-weight: 800;
        }

        .staff-error {
          padding: 13px 16px;
          border-radius: 16px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
          font-size: 14px;
          font-weight: 750;
        }

        .staff-form-card,
        .staff-list-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .staff-form-head,
        .staff-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .staff-form-title,
        .staff-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .staff-form-text,
        .staff-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .staff-cancel {
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          color: #1a120b;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
        }

        .staff-form {
          padding: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .staff-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .staff-field-wide {
          grid-column: span 2;
        }

        .staff-field-full {
          grid-column: 1 / -1;
        }

        .staff-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .staff-input,
        .staff-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          font-size: 13px;
          outline: none;
        }

        .staff-input {
          height: 40px;
          padding: 0 12px;
        }

        .staff-textarea {
          min-height: 78px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.5;
        }

        .staff-input:focus,
        .staff-textarea:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
        }

        .staff-check,
        .staff-submit {
          grid-column: span 2;
        }

        .staff-check {
          min-height: 42px;
          border-radius: 13px;
          border: 1.5px solid #eadfce;
          background: #fffaf2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 11px;
          color: #1a120b;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .staff-check input {
          accent-color: #c8841a;
        }

        .staff-submit {
          height: 42px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 9px 22px rgba(200,132,26,.24);
        }

        .staff-submit:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .staff-loading,
        .staff-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        .staff-spinner {
          width: 32px;
          height: 32px;
          margin: 0 auto 12px;
          border-radius: 50%;
          border: 3px solid #eadfce;
          border-top-color: #c8841a;
          animation: staffSpin .75s linear infinite;
        }

        .staff-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
          gap: 14px;
        }

        .staff-card {
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
        }

        .staff-image {
          position: relative;
          height: 190px;
          background: #fff7e8;
          overflow: hidden;
        }

        .staff-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .staff-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fff7e8, #f1d5a3);
          color: #9a5d0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 950;
        }

        .staff-badge {
          position: absolute;
          top: 9px;
          left: 9px;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(154,93,10,.88);
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .staff-status {
          position: absolute;
          top: 9px;
          right: 9px;
          min-height: 24px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.45);
          backdrop-filter: blur(10px);
        }

        .staff-status-active {
          background: rgba(236,253,245,.92);
          color: #047857;
        }

        .staff-status-inactive {
          background: rgba(254,242,242,.94);
          color: #991b1b;
        }

        .staff-card-body {
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .staff-role-pill {
          align-self: flex-start;
          min-height: 25px;
          padding: 5px 10px;
          border-radius: 999px;
          background: #fff7e8;
          color: #9a5d0a;
          border: 1px solid #f1d5a3;
          font-size: 10px;
          font-weight: 950;
        }

        .staff-name {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
          line-height: 1.15;
        }

        .staff-role {
          margin: -4px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.35;
        }

        .staff-bio {
          margin: 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.5;
          min-height: 54px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .staff-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .staff-info-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .staff-info-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .staff-info-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .staff-actions {
          display: flex;
          gap: 6px;
        }

        .staff-action-btn {
          flex: 1;
          height: 34px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
        }

        .staff-edit-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .staff-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        @media (max-width: 1060px) {
          .staff-toolbar {
            grid-template-columns: 1fr;
          }

          .staff-stats,
          .staff-insights {
            grid-template-columns: 1fr 1fr;
          }

          .staff-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .staff-stats,
          .staff-insights {
            grid-template-columns: 1fr;
          }

          .staff-form {
            grid-template-columns: 1fr;
          }

          .staff-field-wide,
          .staff-field-full,
          .staff-check,
          .staff-submit {
            grid-column: 1 / -1;
          }

          .staff-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .staff-hero {
            padding: 20px;
            border-radius: 20px;
          }

          .staff-image {
            height: 240px;
          }

          .staff-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="staff-page">
        <div className="staff-hero">
          <div className="staff-hero-content">
            <div>
              <p className="staff-kicker">Menaxhimi i stafit</p>
              <h1 className="staff-title">
                Ekipi që klientët <span>e shohin në faqen publike</span>
              </h1>
              <p className="staff-subtitle">
                Këtu admini sheh dhe menaxhon personat që shfaqen te faqja “Ekipi ynë”, me role,
                fotografi, përshkrim dhe status aktiv.
              </p>
            </div>

            <div className="staff-hero-card">
              <strong>{stats.total} persona</strong>
              <span>
                {stats.connected} të lidhur me databazë, {stats.publicOnly} vetëm nga public page.
              </span>
            </div>
          </div>
        </div>

        <div className="staff-toolbar">
          <input
            type="text"
            className="staff-search"
            placeholder="Kërko sipas emrit, rolit ose përshkrimit..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="staff-select"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button type="button" className="staff-refresh" onClick={loadStaff}>
            Rifresko
          </button>
        </div>

        <div className="staff-stats">
          {[
            { label: 'Totali i ekipit', value: stats.total },
            { label: 'Aktivë', value: stats.active },
            { label: 'Nga databaza', value: stats.connected },
            { label: 'Nga public page', value: stats.publicOnly },
          ].map((item) => (
            <div key={item.label} className="staff-stat-card">
              <p className="staff-stat-label">{item.label}</p>
              <p className="staff-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="staff-insights">
          <div className="staff-panel">
            <h2 className="staff-panel-title">Rolet kryesore në ekip</h2>
            <p className="staff-panel-text">
              Kjo tregon si është ndarë ekipi sipas përgjegjësive në evente.
            </p>

            <div className="staff-role-list">
              {roleChart.map((item) => (
                <div key={item.role} className="staff-role-item">
                  <div className="staff-role-top">
                    <span>{item.role}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="staff-role-track">
                    <div
                      className="staff-role-fill"
                      style={{ width: `${Math.max(8, (item.count / maxRoleCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="staff-panel">
            <h2 className="staff-panel-title">Statusi i ekipit</h2>
            <p className="staff-panel-text">
              Sa prej personave janë aktivë për t’u shfaqur në sistem.
            </p>

            <div className="staff-ring-wrap">
              <div className="staff-ring" style={activeStyle}>
                <div className="staff-ring-inner">
                  <span className="staff-ring-number">
                    {stats.total ? Math.round((stats.active / stats.total) * 100) : 0}%
                  </span>
                  <span className="staff-ring-label">aktivë</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="staff-error">{error}</div>}

        <div className="staff-form-card">
          <div className="staff-form-head">
            <div>
              <h2 className="staff-form-title">{editingId ? 'Përditëso anëtarin' : 'Shto anëtar në admin'}</h2>
              <p className="staff-form-text">
                Kur ruhet një person nga public page, ai lidhet me databazën dhe mund të menaxhohet nga admini.
              </p>
            </div>

            {(editingId || form.full_name) && (
              <button type="button" className="staff-cancel" onClick={resetForm}>
                Anulo
              </button>
            )}
          </div>

          <form className="staff-form" onSubmit={handleSubmit}>
            <div className="staff-field staff-field-wide">
              <label className="staff-label">Emri i plotë</label>
              <input
                type="text"
                className="staff-input"
                value={form.full_name}
                onChange={(event) => handleChange('full_name', event.target.value)}
                placeholder="Flutura Hyseni"
                required
              />
            </div>

            <div className="staff-field staff-field-wide">
              <label className="staff-label">Roli</label>
              <input
                type="text"
                className="staff-input"
                value={form.role}
                onChange={(event) => handleChange('role', event.target.value)}
                placeholder="Punëtore Kryesore"
                required
              />
            </div>

            <div className="staff-field staff-field-full">
              <label className="staff-label">Përshkrimi</label>
              <textarea
                className="staff-textarea"
                value={form.bio}
                onChange={(event) => handleChange('bio', event.target.value)}
                placeholder="Përshkrimi i shkurtër për public page..."
              />
            </div>

            <div className="staff-field staff-field-wide">
              <label className="staff-label">Foto</label>
              <input
                type="text"
                className="staff-input"
                value={form.image_url}
                onChange={(event) => handleChange('image_url', event.target.value)}
                placeholder="/images/team/flutura-hyseni.png"
              />
            </div>

            <div className="staff-field">
              <label className="staff-label">Email</label>
              <input
                type="email"
                className="staff-input"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="email@gmail.com"
              />
            </div>

            <div className="staff-field">
              <label className="staff-label">Telefoni</label>
              <input
                type="text"
                className="staff-input"
                value={form.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                placeholder="+383..."
              />
            </div>

            <div className="staff-field">
              <label className="staff-label">Renditja</label>
              <input
                type="number"
                className="staff-input"
                value={form.display_order}
                onChange={(event) => handleChange('display_order', Number(event.target.value))}
                min={1}
              />
            </div>

            <label className="staff-check">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) => handleChange('is_active', event.target.checked)}
              />
              Shfaqe si anëtar aktiv
            </label>

            <button type="submit" className="staff-submit" disabled={submitting}>
              {submitting
                ? editingId
                  ? 'Duke u përditësuar...'
                  : 'Duke u shtuar...'
                : editingId
                  ? 'Ruaj ndryshimet'
                  : 'Ruaj në admin'}
            </button>
          </form>
        </div>

        <div className="staff-list-card">
          <div className="staff-list-head">
            <div>
              <h2 className="staff-list-title">Ekipi i faqes publike</h2>
              <p className="staff-list-text">
                Këta janë personat që klienti i sheh te faqja “Ekipi ynë”.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="staff-loading">
              <div className="staff-spinner" />
              Duke u ngarkuar stafi...
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="staff-empty">Nuk u gjet asnjë anëtar me këto filtra.</div>
          ) : (
            <div className="staff-grid">
              {filteredStaff.map((member) => (
                <article key={`${member.source}-${member.id}`} className="staff-card">
                  <div className="staff-image">
                    <span className="staff-badge">{member.source === 'admin' ? 'Admin' : 'Publik'}</span>

                    <span
                      className={`staff-status ${
                        member.is_active ? 'staff-status-active' : 'staff-status-inactive'
                      }`}
                    >
                      {member.is_active ? 'Aktiv' : 'Jo aktiv'}
                    </span>

                    {member.image_url ? (
                      <img src={member.image_url} alt={member.full_name} />
                    ) : (
                      <div className="staff-placeholder">{initials(member.full_name)}</div>
                    )}
                  </div>

                  <div className="staff-card-body">
                    <span className="staff-role-pill">{member.tag}</span>

                    <div>
                      <h3 className="staff-name">{member.full_name}</h3>
                      <p className="staff-role">{member.role}</p>
                    </div>

                    <p className="staff-bio">{member.bio}</p>

                    <div className="staff-info">
                      <div className="staff-info-box">
                        <span className="staff-info-label">Renditja</span>
                        <span className="staff-info-value">#{member.display_order}</span>
                      </div>

                      <div className="staff-info-box">
                        <span className="staff-info-label">Burimi</span>
                        <span className="staff-info-value">
                          {member.source === 'admin' ? 'Databazë' : 'Public'}
                        </span>
                      </div>
                    </div>

                    <div className="staff-actions">
                      <button type="button" className="staff-action-btn staff-edit-btn" onClick={() => handleEdit(member)}>
                        {member.source === 'admin' ? 'Edito' : 'Ruaj'}
                      </button>

                      <button type="button" className="staff-action-btn staff-delete-btn" onClick={() => handleDelete(member)}>
                        Fshi
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}