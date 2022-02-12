

class Repository {
  constructor(prisma, model) {
    this.prisma = prisma;
    this.model = model;
    this.prisma.$connect();
  }

  /**
   *
   * @param document
   * @returns {Promise<document>}
   */
  async create(document) {
    return this.model.create({
      data: document,
    });
  }

  /**
   *
   * @param whereClause
   * @param document
   * @returns {Promise<Query|*>}
   */
  async update(whereClause = {}, document) {
    return this.model.update({
      where: whereClause,
      data: document,
    });
  }

  /**
   *
   * @param whereClause
   * @param projection
   * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>|Promise<*>>}
   */
  async findUnique(whereClause = {}) {
    return this.model.findUnique({
      where: whereClause,
    });
  }

  /**
   *
   * @param whereClause
   * @param projection
   * @returns {Promise<*>}
   */
  async findMany(whereClause = {}, projection = {}) {
    return this.model.findMany(whereClause, projection);
  }
}

module.exports = Repository;
