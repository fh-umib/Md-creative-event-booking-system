class ReportService {
  async getStats() {
    return {
      totalBookings: 0,
      revenue: 0,
      popularServices: [],
    };
  }
}

module.exports = new ReportService();