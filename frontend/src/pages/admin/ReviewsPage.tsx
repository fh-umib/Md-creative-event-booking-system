import { useMemo, useState } from 'react';

interface ReviewItem {
  id: number;
  customerName: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  category: string;
  helpfulCount: number;
  status: 'Published' | 'Pending';
}

const reviewData: ReviewItem[] = [
  {
    id: 1,
    customerName: 'Sara Krasniqi',
    initials: 'SK',
    rating: 5,
    date: 'Apr 2, 2026',
    text:
      'Amazing party! The kids absolutely loved the mascots and face painting. Everything was perfectly organized and the team was super friendly.',
    category: 'Full Celebration',
    helpfulCount: 12,
    status: 'Published',
  },
  {
    id: 2,
    customerName: 'Lena Morina',
    initials: 'LM',
    rating: 4,
    date: 'Mar 28, 2026',
    text:
      'Great service and beautiful decorations. The unicorn theme was magical! Only minor thing was the setup took a bit longer than expected.',
    category: 'Premium Party',
    helpfulCount: 8,
    status: 'Published',
  },
  {
    id: 3,
    customerName: 'Arta Berisha',
    initials: 'AB',
    rating: 5,
    date: 'Mar 20, 2026',
    text:
      'Best birthday party ever! The photo booth was a huge hit with everyone. Kids and adults both had an incredible time.',
    category: 'Full Celebration',
    helpfulCount: 5,
    status: 'Pending',
  },
  {
    id: 4,
    customerName: 'Dren Hoxha',
    initials: 'DH',
    rating: 3,
    date: 'Mar 15, 2026',
    text:
      'Good overall experience. Would have liked more variety in the activities. The mascot was great though!',
    category: 'Basic Party',
    helpfulCount: 3,
    status: 'Published',
  },
  {
    id: 5,
    customerName: 'Maja Rama',
    initials: 'MR',
    rating: 5,
    date: 'Mar 10, 2026',
    text:
      'Incredible attention to detail. The Safari theme decorations were outstanding! Will definitely book again.',
    category: 'Decoration Only',
    helpfulCount: 7,
    status: 'Pending',
  },
];

const monthlyTrend = [
  { month: 'Jan', value: 4.3 },
  { month: 'Feb', value: 4.4 },
  { month: 'Mar', value: 4.5 },
  { month: 'Apr', value: 4.6 },
  { month: 'May', value: 4.7 },
  { month: 'Jun', value: 4.6 },
];

const ratingDistribution = [
  { stars: 5, count: 42 },
  { stars: 4, count: 28 },
  { stars: 3, count: 12 },
  { stars: 2, count: 5 },
  { stars: 1, count: 2 },
];

export default function AdminReviewsPage() {
  const [reviews] = useState<ReviewItem[]>(reviewData);

  const stats = useMemo(() => {
    const total = reviews.length;
    const published = reviews.filter((r) => r.status === 'Published').length;
    const pending = reviews.filter((r) => r.status === 'Pending').length;
    const avg =
      total === 0
        ? 0
        : (
            reviews.reduce((sum, review) => sum + review.rating, 0) / total
          ).toFixed(1);

    return {
      total,
      published,
      pending,
      average: avg,
    };
  }, [reviews]);

  const maxDistribution = Math.max(...ratingDistribution.map((item) => item.count));

  return (
    <main style={pageStyle}>
      <section style={heroSectionStyle}>
        <div style={heroHeaderStyle}>
          <div>
            <h1 style={pageTitleStyle}>Reviews</h1>
            <p style={pageSubtitleStyle}>Manage customer feedback and testimonials</p>
          </div>

          <div style={searchBoxStyle}>
            <span style={searchIconStyle}>⌕</span>
            <span style={searchPlaceholderStyle}>Search...</span>
          </div>
        </div>

        <div style={statsGridStyle}>
          <div style={statsCardStyle}>
            <div style={{ ...statsIconBoxStyle, background: '#f97316' }}>☆</div>
            <div>
              <p style={statsLabelStyle}>Avg Rating</p>
              <h3 style={statsValueStyle}>{stats.average}</h3>
              <p style={statsHintStyle}>from {stats.total} reviews</p>
            </div>
          </div>

          <div style={statsCardStyle}>
            <div style={{ ...statsIconBoxStyle, background: '#3b82f6' }}>◫</div>
            <div>
              <p style={statsLabelStyle}>Total Reviews</p>
              <h3 style={statsValueStyle}>{stats.total}</h3>
              <p style={statsHintStyle}>all time</p>
            </div>
          </div>

          <div style={statsCardStyle}>
            <div style={{ ...statsIconBoxStyle, background: '#22c55e' }}>⌘</div>
            <div>
              <p style={statsLabelStyle}>Published</p>
              <h3 style={statsValueStyle}>{stats.published}</h3>
              <p style={statsHintStyle}>visible on site</p>
            </div>
          </div>

          <div style={statsCardStyle}>
            <div style={{ ...statsIconBoxStyle, background: '#f59e0b' }}>↗</div>
            <div>
              <p style={statsLabelStyle}>Pending</p>
              <h3 style={statsValueStyle}>{stats.pending}</h3>
              <p style={statsHintStyle}>awaiting approval</p>
            </div>
          </div>
        </div>

        <div style={chartsGridStyle}>
          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Rating Trend</h2>
            <p style={chartSubtitleStyle}>Average monthly rating</p>

            <div style={trendChartWrapStyle}>
              <div style={trendYAxisStyle}>
                <span>5</span>
                <span>4.3</span>
                <span>3.9</span>
                <span>3.5</span>
              </div>

              <div style={trendCanvasStyle}>
                <svg viewBox="0 0 600 240" style={trendSvgStyle}>
                  <line x1="40" y1="30" x2="580" y2="30" style={gridLineStyle} />
                  <line x1="40" y1="90" x2="580" y2="90" style={gridLineStyle} />
                  <line x1="40" y1="150" x2="580" y2="150" style={gridLineStyle} />
                  <line x1="40" y1="210" x2="580" y2="210" style={gridLineStyle} />

                  <path
                    d="M 40 130 C 120 120, 170 110, 240 100 C 310 90, 380 80, 440 70 C 500 60, 540 65, 580 80"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 40 130 C 120 120, 170 110, 240 100 C 310 90, 380 80, 440 70 C 500 60, 540 65, 580 80 L 580 210 L 40 210 Z"
                    fill="rgba(245, 158, 11, 0.10)"
                  />
                </svg>

                <div style={trendMonthsStyle}>
                  {monthlyTrend.map((item) => (
                    <span key={item.month}>{item.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Rating Distribution</h2>
            <p style={chartSubtitleStyle}>Breakdown by star rating</p>

            <div style={distributionWrapStyle}>
              <div style={distributionScoreStyle}>
                <div style={distributionBigStyle}>{stats.average}</div>
                <div style={distributionStarsStyle}>★★★★★</div>
                <div style={distributionHintStyle}>{stats.total} reviews</div>
              </div>

              <div style={distributionBarsStyle}>
                {ratingDistribution.map((item) => (
                  <div key={item.stars} style={distributionRowStyle}>
                    <span style={distributionStarLabelStyle}>{item.stars}</span>
                    <span style={distributionMiniStarStyle}>★</span>
                    <div style={distributionBarTrackStyle}>
                      <div
                        style={{
                          ...distributionBarFillStyle,
                          width: `${(item.count / maxDistribution) * 100}%`,
                        }}
                      />
                    </div>
                    <span style={distributionCountStyle}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section style={reviewsListSectionStyle}>
          {reviews.map((review) => (
            <article key={review.id} style={reviewCardStyle}>
              <div style={reviewAvatarStyle}>{review.initials}</div>

              <div style={reviewMainStyle}>
                <div style={reviewTopStyle}>
                  <div>
                    <h3 style={reviewNameStyle}>{review.customerName}</h3>
                    <div style={reviewMetaRowStyle}>
                      <span style={reviewStarsStyle}>
                        {'★'.repeat(review.rating)}
                        <span style={reviewEmptyStarsStyle}>
                          {'★'.repeat(5 - review.rating)}
                        </span>
                      </span>
                      <span style={reviewDotStyle}>·</span>
                      <span style={reviewDateStyle}>{review.date}</span>
                    </div>
                  </div>

                  <div style={reviewActionsTopStyle}>
                    <span
                      style={
                        review.status === 'Published'
                          ? publishedBadgeStyle
                          : pendingBadgeStyle
                      }
                    >
                      {review.status}
                    </span>
                    <button style={iconButtonGreenStyle}>👍</button>
                    <button style={iconButtonRedStyle}>🗑</button>
                  </div>
                </div>

                <p style={reviewTextStyle}>{review.text}</p>

                <div style={reviewBottomStyle}>
                  <span style={categoryBadgeStyle}>{review.category}</span>
                  <span style={helpfulStyle}>👍 {review.helpfulCount} found helpful</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  background: '#f4f1ec',
  minHeight: '100vh',
  padding: '28px',
};

const heroSectionStyle: React.CSSProperties = {
  maxWidth: '1320px',
  margin: '0 auto',
};

const heroHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '28px',
  flexWrap: 'wrap',
};

const pageTitleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#1f2937',
  fontSize: '52px',
  fontWeight: 800,
  lineHeight: 1.05,
};

const pageSubtitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#6b7280',
  fontSize: '18px',
};

const searchBoxStyle: React.CSSProperties = {
  minWidth: '280px',
  padding: '14px 18px',
  borderRadius: '16px',
  background: '#ffffff',
  border: '1px solid #ece7df',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 6px 16px rgba(15,23,42,0.04)',
};

const searchIconStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '18px',
};

const searchPlaceholderStyle: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '16px',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '18px',
  marginBottom: '28px',
};

const statsCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '18px',
  padding: '22px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
};

const statsIconBoxStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '14px',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: 800,
  flexShrink: 0,
};

const statsLabelStyle: React.CSSProperties = {
  margin: '0 0 6px',
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 600,
};

const statsValueStyle: React.CSSProperties = {
  margin: '0 0 4px',
  color: '#111827',
  fontSize: '36px',
  fontWeight: 800,
  lineHeight: 1,
};

const statsHintStyle: React.CSSProperties = {
  margin: 0,
  color: '#9ca3af',
  fontSize: '14px',
};

const chartsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.1fr 1fr',
  gap: '22px',
  marginBottom: '28px',
};

const chartCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '22px',
  padding: '26px',
  boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
};

const chartTitleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 800,
};

const chartSubtitleStyle: React.CSSProperties = {
  margin: '0 0 22px',
  color: '#6b7280',
  fontSize: '15px',
};

const trendChartWrapStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '46px 1fr',
  gap: '12px',
  alignItems: 'stretch',
};

const trendYAxisStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: '#6b7280',
  fontSize: '14px',
  paddingTop: '14px',
  paddingBottom: '26px',
};

const trendCanvasStyle: React.CSSProperties = {
  position: 'relative',
};

const trendSvgStyle: React.CSSProperties = {
  width: '100%',
  height: '240px',
  display: 'block',
};

const gridLineStyle = {
  stroke: '#e5ddd1',
  strokeWidth: 1,
  strokeDasharray: '4 5',
};

const trendMonthsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  color: '#6b7280',
  fontSize: '14px',
  padding: '0 4px',
  marginTop: '-4px',
};

const distributionWrapStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  gap: '18px',
  alignItems: 'center',
};

const distributionScoreStyle: React.CSSProperties = {
  textAlign: 'center',
};

const distributionBigStyle: React.CSSProperties = {
  fontSize: '56px',
  fontWeight: 800,
  color: '#111827',
  lineHeight: 1,
};

const distributionStarsStyle: React.CSSProperties = {
  marginTop: '10px',
  color: '#f59e0b',
  fontSize: '28px',
  letterSpacing: '0.08em',
};

const distributionHintStyle: React.CSSProperties = {
  marginTop: '8px',
  color: '#6b7280',
  fontSize: '15px',
};

const distributionBarsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const distributionRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '24px 18px 1fr 34px',
  gap: '10px',
  alignItems: 'center',
};

const distributionStarLabelStyle: React.CSSProperties = {
  color: '#4b5563',
  fontSize: '15px',
  textAlign: 'right',
};

const distributionMiniStarStyle: React.CSSProperties = {
  color: '#f59e0b',
  fontSize: '16px',
};

const distributionBarTrackStyle: React.CSSProperties = {
  height: '10px',
  background: '#f5d5df',
  borderRadius: '999px',
  overflow: 'hidden',
};

const distributionBarFillStyle: React.CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)',
  borderRadius: '999px',
};

const distributionCountStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'right',
};

const reviewsListSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const reviewCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '22px',
  padding: '22px 24px',
  boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
  display: 'grid',
  gridTemplateColumns: '54px 1fr',
  gap: '18px',
  alignItems: 'start',
};

const reviewAvatarStyle: React.CSSProperties = {
  width: '54px',
  height: '54px',
  borderRadius: '999px',
  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  color: '#ffffff',
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
};

const reviewMainStyle: React.CSSProperties = {
  minWidth: 0,
};

const reviewTopStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '18px',
  alignItems: 'start',
};

const reviewNameStyle: React.CSSProperties = {
  margin: '0 0 8px',
  color: '#1f2937',
  fontSize: '30px',
  fontWeight: 800,
  lineHeight: 1.05,
};

const reviewMetaRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
};

const reviewStarsStyle: React.CSSProperties = {
  color: '#f59e0b',
  fontSize: '18px',
  letterSpacing: '0.08em',
};

const reviewEmptyStarsStyle: React.CSSProperties = {
  color: '#d1d5db',
};

const reviewDotStyle: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '16px',
};

const reviewDateStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '16px',
};

const reviewActionsTopStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
};

const publishedBadgeStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '999px',
  background: '#f59e0b',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 800,
};

const pendingBadgeStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '999px',
  background: '#ec4899',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 800,
};

const iconButtonGreenStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#22c55e',
  fontSize: '22px',
  cursor: 'pointer',
};

const iconButtonRedStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#ef4444',
  fontSize: '22px',
  cursor: 'pointer',
};

const reviewTextStyle: React.CSSProperties = {
  margin: '18px 0 16px',
  color: '#4b5563',
  fontSize: '17px',
  lineHeight: 1.8,
};

const reviewBottomStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const categoryBadgeStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '999px',
  background: '#f5f5f4',
  color: '#111827',
  fontSize: '14px',
  fontWeight: 700,
  border: '1px solid #e7e5e4',
};

const helpfulStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '15px',
};