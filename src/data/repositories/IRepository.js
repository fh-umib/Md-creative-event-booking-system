class IRepository {
  getAll() {
    throw new Error('Method getAll() must be implemented');
  }

  getById(id) {
    throw new Error('Method getById() must be implemented');
  }

  add(entity) {
    throw new Error('Method add() must be implemented');
  }

  save() {
    throw new Error('Method save() must be implemented');
  }
}

module.exports = IRepository;