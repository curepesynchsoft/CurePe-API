const Repository = require("./core/repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const model = prisma.report;
/**
 *
 * @param data
 * @returns {Promise<document>}
 */
const create = async (data) => {
    const repository = new Repository(prisma, model);
    return repository.create(data);
};


const upsert = async (whereClause, update, create) => {
    return repository.upsert({ ...whereClause }, update, create);
};

/**
 *
 * @param whereClause
 * @param data
 * @returns {Promise<Query|*>}
 */
const update = async (whereClause, data) => {
    const repository = new Repository(prisma, model);
    return repository.update({ ...whereClause, id: whereClause.id }, data);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findUnique = async (whereClause, projection = null) => {
    const repository = new Repository(prisma, model);
    return repository.findUnique({ ...whereClause }, projection);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findMany = async (whereClause, projection = {}) => {
    const repository = new Repository(prisma, model);
    return repository.findMany({ ...whereClause }, projection);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findManyWithRelationship = async (
    whereClause,
    projection = {},
    orderBy = {},
    select = {}
) => {
    const repository = new Repository(prisma, prisma.Wallet);
    return repository.findManyWithRelationship(
        { ...whereClause },
        projection,
        orderBy
    );
};

module.exports = {
    create,
    update,
    findUnique,
    findMany,
    findManyWithRelationship,
    upsert,
};
