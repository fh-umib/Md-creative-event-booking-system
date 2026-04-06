import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicActivities } from '../../services/activityApi';
import type { Activity } from '../../services/activityApi';

export default function ActivitiesPage() {
const [activities, setActivities] = useState<Activity[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [search, setSearch] = useState('');

useEffect(() => {
const loadActivities = async () => {
try {
const data = await getPublicActivities();
setActivities(data);
} catch (err) {
setError(err instanceof Error ? err.message : 'Failed to load activities');
} finally {
setLoading(false);
}
};

loadActivities();
}, []);

const filteredActivities = useMemo(() => {
return activities.filter((item) => {
const text = `${item.name} ${item.description || ''}`.toLowerCase();
return text.includes(search.toLowerCase());
});
}, [activities, search]);

if (loading) {
return <section style={pageStyle}><div style={stateStyle}>Loading activities...</div></section>;
}

if (error) {
return <section style={pageStyle}><div style={stateStyle}>{error}</div></section>;
}

return (
<section style={pageStyle}>
<div style={heroStyle}>
<p style={eyebrowStyle}>Unforgettable Entertainment</p>
<h1 style={titleStyle}>
Activities & <span style={accentTextStyle}>Entertainment</span>
</h1>
<p style={subtitleStyle}>
Unique entertainment services and attractions that make every event extraordinary.
</p>

<div style={statsRowStyle}>
<div style={statBadgeStyle}>Exclusive</div>
<div style={statBadgeStyle}>{activities.length} Total Activities</div>
<div style={statBadgeStyle}>Only in Kosovo</div>
</div>
</div>

<div style={contentStyle}>
<div style={searchBoxStyle}>
<input
type="text"
placeholder="Search activities..."
value={search}
onChange={(e) => setSearch(e.target.value)}
style={searchInputStyle}
/>
</div>

{filteredActivities.length === 0 ? (
<div style={emptyStateStyle}>
<h3 style={emptyTitleStyle}>No activities found</h3>
<p style={emptyTextStyle}>Try changing your search and explore more options.</p>
</div>
) : (
<div style={gridStyle}>
{filteredActivities.map((item) => (
<article key={item.id} style={cardStyle}>
<div style={iconStyle}>✦</div>
<h3 style={cardTitleStyle}>{item.name}</h3>
<p style={cardDescriptionStyle}>{item.description}</p>

<div style={metaRowStyle}>
<span style={priceStyle}>€{item.price}</span>
<span style={durationStyle}>{item.duration_minutes} min</span>
</div>

<span
style={{
...statusBadgeStyle,
...(item.is_active ? activeBadgeStyle : inactiveBadgeStyle),
}}
>
{item.is_active ? 'Active' : 'Inactive'}
</span>
</article>
))}
</div>
)}

<div style={ctaSectionStyle}>
<p style={ctaEyebrowStyle}>Make Your Event Unforgettable</p>
<h2 style={ctaTitleStyle}>Combine activities with mascots, decorations, and photo booths</h2>
<p style={ctaTextStyle}>
Choose the right extras and create an experience your guests will never forget.
</p>
<Link to="/booking" style={ctaButtonStyle}>
Start Planning
</Link>
</div>
</div>
</section>
);
}

const pageStyle: React.CSSProperties = {
maxWidth: '1280px',
margin: '0 auto',
padding: '0 24px 30px',
};

const stateStyle: React.CSSProperties = {
padding: '40px',
textAlign: 'center',
color: '#6b7280',
};

const heroStyle: React.CSSProperties = {
background: 'linear-gradient(135deg, #1d2b4f, #233457)',
borderRadius: '0 0 34px 34px',
padding: '90px 24px 100px',
textAlign: 'center',
color: '#ffffff',
};

const eyebrowStyle: React.CSSProperties = {
display: 'inline-block',
margin: 0,
padding: '10px 18px',
borderRadius: '999px',
border: '1px solid rgba(232, 179, 56, 0.35)',
color: '#e3a52a',
fontSize: '13px',
fontWeight: 700,
letterSpacing: '1.5px',
textTransform: 'uppercase',
};

const titleStyle: React.CSSProperties = {
margin: '24px 0 14px',
fontSize: '72px',
lineHeight: 1,
fontWeight: 800,
};

const accentTextStyle: React.CSSProperties = {
color: '#e3a52a',
};

const subtitleStyle: React.CSSProperties = {
margin: '0 auto',
maxWidth: '760px',
color: 'rgba(255,255,255,0.74)',
fontSize: '18px',
lineHeight: 1.8,
};

const statsRowStyle: React.CSSProperties = {
marginTop: '30px',
display: 'flex',
justifyContent: 'center',
gap: '14px',
flexWrap: 'wrap',
};

const statBadgeStyle: React.CSSProperties = {
padding: '14px 20px',
borderRadius: '999px',
backgroundColor: 'rgba(255,255,255,0.07)',
border: '1px solid rgba(255,255,255,0.09)',
color: 'rgba(255,255,255,0.84)',
fontSize: '14px',
fontWeight: 600,
};

const contentStyle: React.CSSProperties = {
marginTop: '-30px',
};

const searchBoxStyle: React.CSSProperties = {
display: 'flex',
justifyContent: 'center',
marginBottom: '26px',
};

const searchInputStyle: React.CSSProperties = {
width: '100%',
maxWidth: '540px',
height: '56px',
borderRadius: '999px',
border: '1px solid #ece7df',
backgroundColor: '#ffffff',
padding: '0 20px',
fontSize: '15px',
outline: 'none',
boxShadow: '0 12px 26px rgba(15, 23, 42, 0.06)',
};

const emptyStateStyle: React.CSSProperties = {
padding: '80px 20px',
textAlign: 'center',
};

const emptyTitleStyle: React.CSSProperties = {
margin: 0,
fontSize: '38px',
color: '#1f2937',
};

const emptyTextStyle: React.CSSProperties = {
margin: '12px 0 0 0',
color: '#6b7280',
fontSize: '18px',
};

const gridStyle: React.CSSProperties = {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
gap: '22px',
};

const cardStyle: React.CSSProperties = {
backgroundColor: '#ffffff',
borderRadius: '24px',
padding: '24px',
border: '1px solid #ece7df',
boxShadow: '0 16px 30px rgba(15, 23, 42, 0.05)',
};

const iconStyle: React.CSSProperties = {
width: '54px',
height: '54px',
borderRadius: '16px',
backgroundColor: '#fbf1e4',
color: '#c87f17',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '24px',
marginBottom: '18px',
};

const cardTitleStyle: React.CSSProperties = {
margin: 0,
fontSize: '28px',
fontWeight: 800,
color: '#1f2937',
};

const cardDescriptionStyle: React.CSSProperties = {
margin: '12px 0 16px',
color: '#4b5563',
fontSize: '15px',
lineHeight: 1.8,
minHeight: '80px',
};

const metaRowStyle: React.CSSProperties = {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
gap: '12px',
marginBottom: '14px',
};

const priceStyle: React.CSSProperties = {
color: '#ea7b12',
fontWeight: 800,
fontSize: '24px',
};

const durationStyle: React.CSSProperties = {
color: '#6b7280',
fontSize: '14px',
};

const statusBadgeStyle: React.CSSProperties = {
display: 'inline-flex',
padding: '8px 12px',
borderRadius: '999px',
fontSize: '12px',
fontWeight: 700,
};

const activeBadgeStyle: React.CSSProperties = {
backgroundColor: '#fff1de',
color: '#d97706',
};

const inactiveBadgeStyle: React.CSSProperties = {
backgroundColor: '#ffe2ec',
color: '#d6457a',
};

const ctaSectionStyle: React.CSSProperties = {
marginTop: '56px',
textAlign: 'center',
padding: '70px 24px 30px',
};

const ctaEyebrowStyle: React.CSSProperties = {
margin: 0,
color: '#c88d12',
fontSize: '14px',
fontWeight: 700,
letterSpacing: '1.5px',
textTransform: 'uppercase',
};

const ctaTitleStyle: React.CSSProperties = {
margin: '18px auto 12px',
maxWidth: '900px',
fontSize: '56px',
fontWeight: 800,
color: '#1f2937',
lineHeight: 1.1,
};

const ctaTextStyle: React.CSSProperties = {
margin: '0 auto',
maxWidth: '760px',
color: '#6b7280',
fontSize: '18px',
lineHeight: 1.8,
};

const ctaButtonStyle: React.CSSProperties = {
display: 'inline-flex',
marginTop: '26px',
textDecoration: 'none',
backgroundColor: '#e3a52a',
color: '#1f2937',
padding: '16px 28px',
borderRadius: '999px',
fontWeight: 800,
fontSize: '16px',
};
