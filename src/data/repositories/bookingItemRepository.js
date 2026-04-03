const pool = require('../config/db');

const TABLE_MAP = {
  mascots: {
    table: 'booking_mascots',
    itemIdColumn: 'mascot_id',
  },
  activities: {
    table: 'booking_activities',
    itemIdColumn: 'activity_id',
  },
  extras: {
    table: 'booking_extras',
    itemIdColumn: 'extra_id',
  },
};

class BookingItemRepository {
  getConfig(itemType) {
    const config = TABLE_MAP[itemType];

    if (!config) {
      throw new Error(`Unsupported booking item type: ${itemType}`);
    }

    return config;
  }

  async addItem(itemType, data) {
    const { table, itemIdColumn } = this.getConfig(itemType);

    const query = `
      INSERT INTO ${table} (
        booking_id,
        ${itemIdColumn},
        quantity,
        unit_price,
        total_price
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      data.bookingId,
      data.itemId,
      data.quantity ?? 1,
      data.unitPrice ?? 0,
      data.totalPrice ?? 0,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async removeAllByBookingIdAndType(bookingId, itemType) {
    const { table } = this.getConfig(itemType);

    const query = `
      DELETE FROM ${table}
      WHERE booking_id = $1
    `;

    await pool.query(query, [bookingId]);
  }

  async replaceItems(bookingId, itemType, items = []) {
    await this.removeAllByBookingIdAndType(bookingId, itemType);

    const createdItems = [];

    for (const item of items) {
      const created = await this.addItem(itemType, {
        bookingId,
        itemId: item.itemId,
        quantity: item.quantity ?? 1,
        unitPrice: item.unitPrice ?? 0,
        totalPrice: item.totalPrice ?? 0,
      });

      createdItems.push(created);
    }

    return createdItems;
  }

  async getByBookingId(bookingId) {
    const mascotsQuery = `
      SELECT
        bm.id,
        bm.booking_id,
        bm.mascot_id AS item_id,
        bm.quantity,
        bm.unit_price,
        bm.total_price,
        m.name,
        m.character_name
      FROM booking_mascots bm
      LEFT JOIN mascots m ON m.id = bm.mascot_id
      WHERE bm.booking_id = $1
      ORDER BY bm.id ASC
    `;

    const activitiesQuery = `
      SELECT
        ba.id,
        ba.booking_id,
        ba.activity_id AS item_id,
        ba.quantity,
        ba.unit_price,
        ba.total_price,
        a.name
      FROM booking_activities ba
      LEFT JOIN activities a ON a.id = ba.activity_id
      WHERE ba.booking_id = $1
      ORDER BY ba.id ASC
    `;

    const extrasQuery = `
      SELECT
        be.id,
        be.booking_id,
        be.extra_id AS item_id,
        be.quantity,
        be.unit_price,
        be.total_price,
        e.name
      FROM booking_extras be
      LEFT JOIN extras e ON e.id = be.extra_id
      WHERE be.booking_id = $1
      ORDER BY be.id ASC
    `;

    const [mascotsResult, activitiesResult, extrasResult] = await Promise.all([
      pool.query(mascotsQuery, [bookingId]),
      pool.query(activitiesQuery, [bookingId]),
      pool.query(extrasQuery, [bookingId]),
    ]);

    return {
      mascots: mascotsResult.rows,
      activities: activitiesResult.rows,
      extras: extrasResult.rows,
    };
  }

  async deleteAllByBookingId(bookingId) {
    await Promise.all([
      pool.query(`DELETE FROM booking_mascots WHERE booking_id = $1`, [bookingId]),
      pool.query(`DELETE FROM booking_activities WHERE booking_id = $1`, [bookingId]),
      pool.query(`DELETE FROM booking_extras WHERE booking_id = $1`, [bookingId]),
    ]);
  }
}

module.exports = new BookingItemRepository();