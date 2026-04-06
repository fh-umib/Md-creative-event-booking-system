const pool = require('../config/db');

async function getAllAlbums({ search = '', category = '', published = '' } = {}) {
  const conditions = [];
  const values = [];
  let index = 1;

  if (search) {
    conditions.push(`(a.title ILIKE $${index} OR a.description ILIKE $${index})`);
    values.push(`%${search}%`);
    index++;
  }

  if (category) {
    conditions.push(`a.category = $${index}`);
    values.push(category);
    index++;
  }

  if (published !== '') {
    conditions.push(`a.is_published = $${index}`);
    values.push(published === 'true');
    index++;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT
      a.id,
      a.title,
      a.slug,
      a.description,
      a.category,
      a.cover_image_url,
      a.event_date,
      a.is_featured,
      a.is_published,
      a.display_order,
      a.created_at,
      a.updated_at,
      COUNT(p.id)::int AS photo_count
    FROM gallery_albums a
    LEFT JOIN gallery_photos p ON p.album_id = a.id
    ${whereClause}
    GROUP BY a.id
    ORDER BY a.display_order ASC, a.created_at DESC
  `;

  const result = await pool.query(query, values);
  return result.rows;
}

async function getPublishedAlbums() {
  const query = `
    SELECT
      a.id,
      a.title,
      a.slug,
      a.description,
      a.category,
      a.cover_image_url,
      a.event_date,
      a.is_featured,
      a.is_published,
      a.display_order,
      a.created_at,
      a.updated_at,
      COUNT(p.id)::int AS photo_count
    FROM gallery_albums a
    LEFT JOIN gallery_photos p ON p.album_id = a.id
    WHERE a.is_published = TRUE
    GROUP BY a.id
    ORDER BY a.is_featured DESC, a.display_order ASC, a.created_at DESC
  `;

  const result = await pool.query(query);
  return result.rows;
}

async function getAlbumById(id) {
  const query = `
    SELECT
      a.id,
      a.title,
      a.slug,
      a.description,
      a.category,
      a.cover_image_url,
      a.event_date,
      a.is_featured,
      a.is_published,
      a.display_order,
      a.created_at,
      a.updated_at
    FROM gallery_albums a
    WHERE a.id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

async function getAlbumBySlug(slug) {
  const query = `
    SELECT
      a.id,
      a.title,
      a.slug,
      a.description,
      a.category,
      a.cover_image_url,
      a.event_date,
      a.is_featured,
      a.is_published,
      a.display_order,
      a.created_at,
      a.updated_at
    FROM gallery_albums a
    WHERE a.slug = $1
  `;

  const result = await pool.query(query, [slug]);
  return result.rows[0] || null;
}

async function createAlbum(data) {
  const query = `
    INSERT INTO gallery_albums
    (title, slug, description, category, cover_image_url, event_date, is_featured, is_published, display_order)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
  `;

  const values = [
    data.title,
    data.slug,
    data.description || null,
    data.category,
    data.cover_image_url,
    data.event_date || null,
    data.is_featured ?? false,
    data.is_published ?? true,
    data.display_order ?? 0,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateAlbum(id, data) {
  const query = `
    UPDATE gallery_albums
    SET
      title = $1,
      slug = $2,
      description = $3,
      category = $4,
      cover_image_url = $5,
      event_date = $6,
      is_featured = $7,
      is_published = $8,
      display_order = $9,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $10
    RETURNING *
  `;

  const values = [
    data.title,
    data.slug,
    data.description || null,
    data.category,
    data.cover_image_url,
    data.event_date || null,
    data.is_featured ?? false,
    data.is_published ?? true,
    data.display_order ?? 0,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function deleteAlbum(id) {
  const query = `DELETE FROM gallery_albums WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

async function getPhotosByAlbumId(albumId) {
  const query = `
    SELECT
      id,
      album_id,
      image_url,
      alt_text,
      caption,
      is_cover,
      display_order,
      created_at
    FROM gallery_photos
    WHERE album_id = $1
    ORDER BY display_order ASC, id ASC
  `;

  const result = await pool.query(query, [albumId]);
  return result.rows;
}

async function getPhotoById(id) {
  const query = `
    SELECT
      id,
      album_id,
      image_url,
      alt_text,
      caption,
      is_cover,
      display_order,
      created_at
    FROM gallery_photos
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

async function createPhoto(data) {
  const query = `
    INSERT INTO gallery_photos
    (album_id, image_url, alt_text, caption, is_cover, display_order)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
  `;

  const values = [
    data.album_id,
    data.image_url,
    data.alt_text || null,
    data.caption || null,
    data.is_cover ?? false,
    data.display_order ?? 0,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updatePhoto(id, data) {
  const query = `
    UPDATE gallery_photos
    SET
      image_url = $1,
      alt_text = $2,
      caption = $3,
      is_cover = $4,
      display_order = $5
    WHERE id = $6
    RETURNING *
  `;

  const values = [
    data.image_url,
    data.alt_text || null,
    data.caption || null,
    data.is_cover ?? false,
    data.display_order ?? 0,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function deletePhoto(id) {
  const query = `DELETE FROM gallery_photos WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

module.exports = {
  getAllAlbums,
  getPublishedAlbums,
  getAlbumById,
  getAlbumBySlug,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getPhotosByAlbumId,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
};