import { useMemo, useState } from 'react';

type ReviewStatus = 'Published' | 'Pending';

interface ReviewItem {
  id: number;
  customerName: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  category: string;
  helpfulCount: number;
  status: ReviewStatus;
}

const initialReviews: ReviewItem[] = [
  {
    id: 1,
    customerName: 'Sara Krasniqi',
    initials: 'SK',
    rating: 5,
    date: '02 Prill 2026',
    text: 'Festa ishte shumë e bukur. Fëmijët u kënaqën me maskotat dhe face painting. Organizimi ishte shumë i mirë dhe ekipi shumë i sjellshëm.',
    category: 'Full Celebration',
    helpfulCount: 12,
    status: 'Published',
  },
  {
    id: 2,
    customerName: 'Lena Morina',
    initials: 'LM',
    rating: 4,
    date: '28 Mars 2026',
    text: 'Shërbim shumë i mirë dhe dekorime shumë të bukura. Tema unicorn ishte shumë e ëmbël. Vetëm përgatitja zgjati pak më shumë se sa pritej.',
    category: 'Premium Party',
    helpfulCount: 8,
    status: 'Published',
  },
  {
    id: 3,
    customerName: 'Arta Berisha',
    initials: 'AB',
    rating: 5,
    date: '20 Mars 2026',
    text: 'Photo booth ishte pjesa më e pëlqyer e eventit. Fëmijët dhe të rriturit u argëtuan shumë. Do t’i rekomandoja pa dyshim.',
    category: 'Full Celebration',
    helpfulCount: 5,
    status: 'Pending',
  },
  {
    id: 4,
    customerName: 'Dren Hoxha',
    initials: 'DH',
    rating: 3,
    date: '15 Mars 2026',
    text: 'Eksperiencë e mirë në përgjithësi. Maskota ishte shumë e mirë, por do të doja pak më shumë larmi në aktivitetet për fëmijë.',
    category: 'Basic Party',
    helpfulCount: 3,
    status: 'Published',
  },
  {
    id: 5,
    customerName: 'Maja Rama',
    initials: 'MR',
    rating: 5,
    date: '10 Mars 2026',
    text: 'Dekorimet me temë Safari ishin fantastike. Detajet ishin shumë të kujdesshme dhe atmosfera doli tamam siç e kishim menduar.',
    category: 'Decoration Only',
    helpfulCount: 7,
    status: 'Pending',
  },
];

const monthlyTrend = [
  { month: 'Jan', value: 4.3 },
  { month: 'Shk', value: 4.4 },
  { month: 'Mar', value: 4.5 },
  { month: 'Pri', value: 4.6 },
  { month: 'Maj', value: 4.7 },
  { month: 'Qer', value: 4.6 },
];

const ratingDistribution = [
  { stars: 5, count: 42 },
  { stars: 4, count: 28 },
  { stars: 3, count: 12 },
  { stars: 2, count: 5 },
  { stars: 1, count: 2 },
];

const statusLabels: Record<ReviewStatus, string> = {
  Published: 'Publikuar',
  Pending: 'Në pritje',
};

type FilterStatus = 'All' | ReviewStatus;

function renderStars(rating: number) {
  return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');

  const filteredReviews = useMemo(() => {
    const value = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const text = `${review.customerName} ${review.category} ${review.text}`.toLowerCase();

      const matchesSearch = !value || text.includes(value);
      const matchesStatus = statusFilter === 'All' || review.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, statusFilter]);

  const stats = useMemo(() => {
    const total = reviews.length;
    const published = reviews.filter((review) => review.status === 'Published').length;
    const pending = reviews.filter((review) => review.status === 'Pending').length;
    const average =
      total === 0
        ? '0.0'
        : (reviews.reduce((sum, review) => sum + review.rating, 0) / total).toFixed(1);

    const positive = reviews.filter((review) => review.rating >= 4).length;

    return {
      total,
      published,
      pending,
      average,
      positive,
    };
  }, [reviews]);

  const maxDistribution = Math.max(...ratingDistribution.map((item) => item.count), 1);

  const handleToggleStatus = (id: number) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status: review.status === 'Published' ? 'Pending' : 'Published',
            }
          : review,
      ),
    );
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('A jeni e sigurt që dëshironi ta fshini këtë vlerësim?');

    if (!confirmed) return;

    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <>
      <style>{`
        .reviews-page {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        .reviews-hero {
          border-radius: 26px;
          border: 1px solid #eadfce;
          background:
            radial-gradient(circle at 12% 20%, rgba(212,145,30,.22), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          color: #ffffff;
          padding: 26px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 12px 34px rgba(26,18,11,.14);
        }

        .reviews-hero::after {
          content: "REVIEWS";
          position: absolute;
          right: 22px;
          bottom: -24px;
          font-size: clamp(54px, 9vw, 120px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .reviews-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .reviews-kicker {
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .reviews-title {
          margin: 0;
          font-size: clamp(25px, 3.2vw, 40px);
          line-height: 1.05;
          font-weight: 950;
        }

        .reviews-title span {
          color: #d4911e;
          font-style: italic;
        }

        .reviews-subtitle {
          margin: 10px 0 0;
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .reviews-score-card {
          min-width: 220px;
          border-radius: 20px;
          border: 1px solid rgba(212,145,30,.28);
          background: rgba(255,255,255,.07);
          padding: 16px;
          backdrop-filter: blur(12px);
        }

        .reviews-score-card strong {
          display: block;
          color: #ffffff;
          font-size: 34px;
          font-weight: 950;
          line-height: 1;
        }

        .reviews-score-stars {
          margin-top: 8px;
          color: #d4911e;
          letter-spacing: 2px;
          font-size: 15px;
        }

        .reviews-score-card span {
          display: block;
          margin-top: 8px;
          color: rgba(255,255,255,.6);
          font-size: 13px;
          line-height: 1.45;
        }

        .reviews-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) auto auto auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .reviews-search {
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

        .reviews-search:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .reviews-filter-btn {
          height: 40px;
          border-radius: 999px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #6b5a45;
          padding: 0 14px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          white-space: nowrap;
        }

        .reviews-filter-btn.active {
          background: linear-gradient(135deg, #d4911e, #b87318);
          border-color: #d4911e;
          color: #ffffff;
        }

        .reviews-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(135px, 1fr));
          gap: 12px;
        }

        .reviews-stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 18px;
          padding: 15px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
        }

        .reviews-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .reviews-stat-label {
          margin: 0;
          color: #7a6a52;
          font-size: 11px;
          font-weight: 750;
        }

        .reviews-stat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8841a;
          box-shadow: 0 0 0 5px rgba(200,132,26,.12);
        }

        .reviews-stat-value {
          margin: 0;
          color: #1a120b;
          font-size: 22px;
          font-weight: 950;
          line-height: 1;
        }

        .reviews-insights {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(310px, .8fr);
          gap: 14px;
        }

        .reviews-panel {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 7px 22px rgba(26,18,11,.05);
          min-width: 0;
        }

        .reviews-panel-title {
          margin: 0;
          color: #1a120b;
          font-size: 17px;
          font-weight: 950;
        }

        .reviews-panel-subtitle {
          margin: 5px 0 15px;
          color: #7a6a52;
          font-size: 12.5px;
          line-height: 1.45;
        }

        .reviews-trend {
          height: 190px;
          border-radius: 18px;
          background:
            linear-gradient(to bottom, transparent 24%, rgba(234,223,206,.55) 25%, transparent 26%),
            linear-gradient(to bottom, transparent 49%, rgba(234,223,206,.55) 50%, transparent 51%),
            linear-gradient(to bottom, transparent 74%, rgba(234,223,206,.55) 75%, transparent 76%),
            #fffaf2;
          border: 1px solid #f3eadc;
          padding: 16px;
          display: flex;
          align-items: end;
          gap: 12px;
        }

        .reviews-trend-bar {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
          gap: 8px;
          height: 100%;
        }

        .reviews-trend-fill {
          width: 100%;
          max-width: 42px;
          border-radius: 999px 999px 8px 8px;
          background: linear-gradient(180deg, #d4911e, #b87318);
          box-shadow: 0 8px 20px rgba(200,132,26,.2);
        }

        .reviews-trend-month {
          color: #7a6a52;
          font-size: 11px;
          font-weight: 850;
        }

        .reviews-distribution {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reviews-distribution-row {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 34px;
          gap: 10px;
          align-items: center;
        }

        .reviews-star-label {
          color: #1a120b;
          font-size: 12px;
          font-weight: 900;
        }

        .reviews-bar-track {
          height: 9px;
          border-radius: 999px;
          background: #f1dfc5;
          overflow: hidden;
        }

        .reviews-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4911e, #b87318);
        }

        .reviews-count {
          color: #7a6a52;
          font-size: 12px;
          font-weight: 850;
          text-align: right;
        }

        .reviews-list-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #eadfce;
          border-radius: 22px;
          box-shadow: 0 8px 24px rgba(26,18,11,.06);
          overflow: hidden;
        }

        .reviews-list-head {
          padding: 17px 18px;
          border-bottom: 1px solid #f0e4d2;
          background: linear-gradient(135deg, #fffdf8, #ffffff);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .reviews-list-title {
          margin: 0;
          color: #1a120b;
          font-size: 18px;
          font-weight: 950;
        }

        .reviews-list-text {
          margin: 5px 0 0;
          color: #7a6a52;
          font-size: 12px;
          line-height: 1.45;
        }

        .reviews-list-count {
          min-height: 31px;
          padding: 7px 12px;
          border-radius: 999px;
          background: #fff7e8;
          color: #9a5d0a;
          font-size: 12px;
          font-weight: 850;
          border: 1px solid #f1d5a3;
          white-space: nowrap;
        }

        .reviews-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
          gap: 14px;
        }

        .review-card {
          border: 1px solid #eadfce;
          border-radius: 18px;
          background: #ffffff;
          padding: 15px;
          box-shadow: 0 4px 14px rgba(26,18,11,.04);
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        .review-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .review-user {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .review-avatar {
          width: 42px;
          height: 42px;
          border-radius: 15px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 950;
          flex-shrink: 0;
        }

        .review-name {
          margin: 0;
          color: #1a120b;
          font-size: 14px;
          font-weight: 950;
        }

        .review-date {
          margin: 3px 0 0;
          color: #9a8878;
          font-size: 11px;
          font-weight: 750;
        }

        .review-status {
          min-height: 25px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 950;
          white-space: nowrap;
        }

        .review-status-published {
          background: #ecfdf5;
          color: #047857;
        }

        .review-status-pending {
          background: #fff7e8;
          color: #9a5d0a;
        }

        .review-stars {
          color: #d4911e;
          letter-spacing: 1px;
          font-size: 14px;
        }

        .review-text {
          margin: 0;
          color: #6b5a45;
          font-size: 13px;
          line-height: 1.6;
          min-height: 84px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .review-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .review-meta-box {
          border-radius: 12px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          padding: 8px;
          min-width: 0;
        }

        .review-meta-label {
          display: block;
          color: #8a7558;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .review-meta-value {
          color: #1a120b;
          font-size: 12px;
          font-weight: 850;
          word-break: break-word;
        }

        .review-actions {
          display: flex;
          gap: 7px;
        }

        .review-action-btn {
          flex: 1;
          height: 35px;
          border-radius: 11px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: transform .15s;
        }

        .review-action-btn:hover {
          transform: translateY(-1px);
        }

        .review-publish-btn {
          border: 1.5px solid #f1d5a3;
          background: #fff7e8;
          color: #9a5d0a;
        }

        .review-delete-btn {
          border: 1.5px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        .reviews-empty {
          padding: 44px 18px;
          text-align: center;
          color: #7a6a52;
          font-size: 14px;
        }

        @media (max-width: 1060px) {
          .reviews-toolbar {
            grid-template-columns: 1fr 1fr;
          }

          .reviews-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .reviews-insights {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .reviews-toolbar {
            grid-template-columns: 1fr;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .reviews-hero {
            padding: 20px;
            border-radius: 20px;
          }

          .reviews-stats {
            grid-template-columns: 1fr;
          }

          .review-meta {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="reviews-page">
        <div className="reviews-hero">
          <div className="reviews-hero-content">
            <div>
              <p className="reviews-kicker">Menaxhimi i vlerësimeve</p>
              <h1 className="reviews-title">
                Çka thonë klientët <span>për MD Creative</span>
              </h1>
              <p className="reviews-subtitle">
                Këtu admini kontrollon vlerësimet e klientëve, vendos cilat publikohen në faqe dhe monitoron
                cilësinë e përvojës së klientëve.
              </p>
            </div>

            <div className="reviews-score-card">
              <strong>{stats.average}</strong>
              <div className="reviews-score-stars">★★★★★</div>
              <span>Vlerësimi mesatar nga {stats.total} komente të regjistruara.</span>
            </div>
          </div>
        </div>

        <div className="reviews-toolbar">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="reviews-search"
            placeholder="Kërko sipas klientit, paketës ose komentit..."
          />

          <button
            type="button"
            className={`reviews-filter-btn ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => setStatusFilter('All')}
          >
            Të gjitha
          </button>

          <button
            type="button"
            className={`reviews-filter-btn ${statusFilter === 'Published' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Published')}
          >
            Publikuara
          </button>

          <button
            type="button"
            className={`reviews-filter-btn ${statusFilter === 'Pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Pending')}
          >
            Në pritje
          </button>
        </div>

        <div className="reviews-stats">
          {[
            { label: 'Mesatarja', value: stats.average },
            { label: 'Totali', value: stats.total },
            { label: 'Publikuara', value: stats.published },
            { label: 'Në pritje', value: stats.pending },
            { label: 'Pozitive', value: stats.positive },
          ].map((item) => (
            <div key={item.label} className="reviews-stat-card">
              <div className="reviews-stat-top">
                <p className="reviews-stat-label">{item.label}</p>
                <span className="reviews-stat-dot" />
              </div>
              <p className="reviews-stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="reviews-insights">
          <div className="reviews-panel">
            <h2 className="reviews-panel-title">Trendi i vlerësimit</h2>
            <p className="reviews-panel-subtitle">
              Pamje e thjeshtë e notës mesatare mujore për përvojën e klientëve.
            </p>

            <div className="reviews-trend">
              {monthlyTrend.map((item) => (
                <div key={item.month} className="reviews-trend-bar">
                  <div
                    className="reviews-trend-fill"
                    style={{ height: `${Math.max(18, (item.value / 5) * 100)}%` }}
                    title={`${item.value}/5`}
                  />
                  <span className="reviews-trend-month">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-panel">
            <h2 className="reviews-panel-title">Shpërndarja e yjeve</h2>
            <p className="reviews-panel-subtitle">
              Sa vlerësime janë dhënë për secilën kategori të yjeve.
            </p>

            <div className="reviews-distribution">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="reviews-distribution-row">
                  <span className="reviews-star-label">{item.stars} ★</span>

                  <div className="reviews-bar-track">
                    <div
                      className="reviews-bar-fill"
                      style={{ width: `${(item.count / maxDistribution) * 100}%` }}
                    />
                  </div>

                  <span className="reviews-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reviews-list-card">
          <div className="reviews-list-head">
            <div>
              <h2 className="reviews-list-title">Lista e vlerësimeve</h2>
              <p className="reviews-list-text">
                Menaxho komentet që shfaqen ose presin aprovim për faqen publike.
              </p>
            </div>

            <span className="reviews-list-count">{filteredReviews.length} rezultate</span>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="reviews-empty">Nuk u gjet asnjë vlerësim me këto filtra.</div>
          ) : (
            <div className="reviews-grid">
              {filteredReviews.map((review) => (
                <article key={review.id} className="review-card">
                  <div className="review-card-top">
                    <div className="review-user">
                      <div className="review-avatar">{review.initials}</div>

                      <div>
                        <h3 className="review-name">{review.customerName}</h3>
                        <p className="review-date">{review.date}</p>
                      </div>
                    </div>

                    <span
                      className={`review-status ${
                        review.status === 'Published' ? 'review-status-published' : 'review-status-pending'
                      }`}
                    >
                      {statusLabels[review.status]}
                    </span>
                  </div>

                  <div className="review-stars">{renderStars(review.rating)}</div>

                  <p className="review-text">{review.text}</p>

                  <div className="review-meta">
                    <div className="review-meta-box">
                      <span className="review-meta-label">Paketa</span>
                      <span className="review-meta-value">{review.category}</span>
                    </div>

                    <div className="review-meta-box">
                      <span className="review-meta-label">Pëlqime</span>
                      <span className="review-meta-value">{review.helpfulCount}</span>
                    </div>
                  </div>

                  <div className="review-actions">
                    <button
                      type="button"
                      className="review-action-btn review-publish-btn"
                      onClick={() => handleToggleStatus(review.id)}
                    >
                      {review.status === 'Published' ? 'Hiqe' : 'Publiko'}
                    </button>

                    <button
                      type="button"
                      className="review-action-btn review-delete-btn"
                      onClick={() => handleDelete(review.id)}
                    >
                      Fshi
                    </button>
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