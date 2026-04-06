import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicMascots } from '../../services/mascotApi';
import type { Mascot } from '../../services/mascotApi';

export default function MascotsPage() {
const [mascots, setMascots] = useState<Mascot[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [search, setSearch] = useState('');
const [selectedTheme, setSelectedTheme] = useState('All');

useEffect(() => {
const loadMascots = async () => {
try {
const data = await getPublicMascots();
setMascots(data);
} catch (err) {
setError(err instanceof Error ? err.message : 'Failed to load mascots');
} finally {
setLoading(false);
}
};

loadMascots();
}, []);

const themes = useMemo(() => {
const allThemes = mascots
.map((item) => item.theme || 'Other')
.filter((value, index, arr) => arr.indexOf(value) === index);

return ['All', ...allThemes];
}, [mascots]);

const filteredMascots = useMemo(() => {
return mascots.filter((item) => {
const matchesSearch =
item.name.toLowerCase().includes(search.toLowerCase()) ||
item.character_name.toLowerCase().includes(search.toLowerCase()) ||
(item.theme || '').toLowerCase().includes(search.toLowerCase());

const matchesTheme =
selectedTheme === 'All' || (item.theme || 'Other') === selectedTheme;

return matchesSearch && matchesTheme;
});
}, [mascots, search, selectedTheme]);

if (loading) {
return <section style={pageStyle}><div style={stateStyle}>Loading mascots...</div></section>;
}

if (error) {
return <section style={pageStyle}><div style={stateStyle}>{error}</div></section>;
}

return (
<section style={pageStyle}>
<div style={heroStyle}>
<p style={eyebrowStyle}>50+ Characters Available</p>
<h1 style={titleStyle}>
Mascot <span style={accentTextStyle}>Characters</span>
</h1>
<p style={subtitleStyle}>
Bring magic and excitement to your celebration with our beloved character collection.
</p>

<div style={searchWrapperStyle}>
<input
type="text"
placeholder="Search characters by name..."
value={search}
onChange={(e) => setSearch(e.target.value)}
style={searchInputStyle}
/>
</div>
</div>

<div style={filterRowStyle}>
{themes.map((theme) => (
<button
key={theme}
type="button"
onClick={() => setSelectedTheme(theme)}
style={{
...filterButtonStyle,
...(selectedTheme === theme ? activeFilterButtonStyle : {}),
}}
>
{theme}
</button>
))}
</div>

<p style={countStyle}>Showing {filteredMascots.length} characters</p>

{filteredMascots.length === 0 ? (
<div style={emptyStateStyle}>
<h3 style={emptyTitleStyle}>No characters found</h3>
<p style={emptyTextStyle}>Try adjusting your filters or search.</p>
</div>
) : (
<div style={gridStyle}>
{filteredMascots.map((item) => (
<article key={item.id} style={cardStyle}>
<div style={cardTopStyle}>
<div style={avatarStyle}>
{item.character_name.charAt(0)}
</div>

<span
style={{
...badgeStyle,
...(item.is_available ? availableBadgeStyle : unavailableBadgeStyle),
}}
>
{item.is_available ? 'Available' : 'Booked'}
</span>
</div>

<h3 style={cardTitleStyle}>{item.character_name}</h3>
<p style={cardSubtitleStyle}>{item.theme || item.name}</p>
<p style={cardDescriptionStyle}>{item.description}</p>

<div style={metaRowStyle}>
<span style={priceStyle}>€{item.price}/hr</span>
<span style={durationStyle}>{item.duration_minutes} min</span>
</div>

<Link to="/booking" style={cardButtonStyle}>
Book Character
</Link>
</article>
))}
</div>
)}

<div style={ctaSectionStyle}>
<p style={ctaEyebrowStyle}>Found Your Favorites?</p>
<h2 style={ctaTitleStyle}>Add mascot characters to your booking</h2>
<p style={ctaTextStyle}>
Create an unforgettable celebration with playful characters your guests will love.
</p>
<Link to="/booking" style={ctaButtonStyle}>
Book Characters
</Link>
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
padding: '90px 24px 110px',
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
maxWidth: '700px',
color: 'rgba(255,255,255,0.74)',
fontSize: '18px',
lineHeight: 1.8,
};

const searchWrapperStyle: React.CSSProperties = {
marginTop: '34px',
display: 'flex',
justifyContent: 'center',
};

const searchInputStyle: React.CSSProperties = {
width: '100%',
maxWidth: '560px',
height: '58px',
borderRadius: '999px',
border: '1px solid rgba(255,255,255,0.14)',
backgroundColor: 'rgba(255,255,255,0.06)',
color: '#ffffff',
padding: '0 22px',
fontSize: '16px',
outline: 'none',
};

const filterRowStyle: React.CSSProperties = {
marginTop: '-28px',
display: 'flex',
gap: '12px',
flexWrap: 'wrap',
justifyContent: 'center',
};

const filterButtonStyle: React.CSSProperties = {
border: '1px solid #e8ded0',
backgroundColor: '#ffffff',
color: '#1f2b46',
borderRadius: '999px',
padding: '12px 18px',
fontSize: '14px',
fontWeight: 700,
cursor: 'pointer',
boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
};

const activeFilterButtonStyle: React.CSSProperties = {
backgroundColor: '#1f2b46',
color: '#ffffff',
};

const countStyle: React.CSSProperties = {
margin: '28px 0 26px',
textAlign: 'center',
color: '#6b7280',
fontSize: '15px',
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
gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
gap: '22px',
};

const cardStyle: React.CSSProperties = {
backgroundColor: '#ffffff',
borderRadius: '24px',
padding: '24px',
border: '1px solid #ece7df',
boxShadow: '0 16px 30px rgba(15, 23, 42, 0.05)',
};

const cardTopStyle: React.CSSProperties = {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
gap: '12px',
marginBottom: '18px',
};

const avatarStyle: React.CSSProperties = {
width: '58px',
height: '58px',
borderRadius: '18px',
background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
color: '#ffffff',
fontSize: '28px',
fontWeight: 800,
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
};

const badgeStyle: React.CSSProperties = {
padding: '8px 12px',
borderRadius: '999px',
fontSize: '12px',
fontWeight: 700,
};

const availableBadgeStyle: React.CSSProperties = {
backgroundColor: '#e8f7ee',
color: '#1f7a45',
};

const unavailableBadgeStyle: React.CSSProperties = {
backgroundColor: '#fff1de',
color: '#d97706',
};

const cardTitleStyle: React.CSSProperties = {
margin: 0,
fontSize: '30px',
color: '#1f2937',
fontWeight: 800,
};

const cardSubtitleStyle: React.CSSProperties = {
margin: '8px 0 12px',
color: '#6b7280',
fontSize: '15px',
};

const cardDescriptionStyle: React.CSSProperties = {
margin: 0,
color: '#4b5563',
fontSize: '15px',
lineHeight: 1.8,
minHeight: '78px',
};

const metaRowStyle: React.CSSProperties = {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
gap: '12px',
marginTop: '20px',
marginBottom: '18px',
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

const cardButtonStyle: React.CSSProperties = {
display: 'inline-flex',
justifyContent: 'center',
alignItems: 'center',
width: '100%',
height: '48px',
borderRadius: '14px',
textDecoration: 'none',
backgroundColor: '#f7f3ee',
color: '#1f2937',
fontWeight: 700,
fontSize: '14px',
};

const ctaSectionStyle: React.CSSProperties = {
marginTop: '56px',
background: 'linear-gradient(135deg, #1d2b4f, #233457)',
borderRadius: '30px',
padding: '70px 24px',
textAlign: 'center',
color: '#ffffff',
};

const ctaEyebrowStyle: React.CSSProperties = {
margin: 0,
color: '#e3a52a',
fontSize: '14px',
fontWeight: 700,
letterSpacing: '1.5px',
textTransform: 'uppercase',
};

const ctaTitleStyle: React.CSSProperties = {
margin: '16px 0 12px',
fontSize: '52px',
fontWeight: 800,
};

const ctaTextStyle: React.CSSProperties = {
margin: '0 auto',
maxWidth: '700px',
color: 'rgba(255,255,255,0.76)',
fontSize: '18px',
lineHeight: 1.8,
};

const ctaButtonStyle: React.CSSProperties = {
display: 'inline-flex',
marginTop: '28px',
textDecoration: 'none',
backgroundColor: '#e3a52a',
color: '#1f2937',
padding: '16px 28px',
borderRadius: '999px',
fontWeight: 800,
fontSize: '16px',
};
