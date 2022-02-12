const Repository = require("./core/repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 *
 * @param data
 * @returns {Promise<document>}
 */
const create = async (data) => {
    const repository = new Repository(prisma, prisma.User);
    return repository.create(data);
};

/**
 *
 * @param whereClause
 * @param data
 * @returns {Promise<Query|*>}
 */
const update = async (whereClause, data) => {
    const repository = new Repository(prisma, prisma.User);
    return repository.update({ ...whereClause, id: whereClause.id }, data);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findUnique = async (whereClause, projection = {}) => {
    const repository = new Repository(prisma, prisma.User);
    return repository.findUnique({ ...whereClause, id: whereClause.id }, projection);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findMany = async (whereClause, projection = {}) => {
    const repository = new Repository(prisma, prisma.User);
    return repository.findMany({ ...whereClause}, projection);
};

module.exports = { create, update, findUnique,findMany };


