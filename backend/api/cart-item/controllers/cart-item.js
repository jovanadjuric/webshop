'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller.
 * 
 * Modified to enforce the [Create is owner policy](https://strapi.io/documentation/developer-docs/latest/guides/is-owner.html).
 */

module.exports = {
  count(ctx) {
    const user = ctx.state.user.id;
    return strapi.services['cart-item'].count({ user });
  },

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services['cart-item'].create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services['cart-item'].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models['cart-item'] });
  },

  async delete(ctx) {
    const user = ctx.state.user.id;
    const entities = await strapi.services['cart-item'].delete({ user });
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['cart-item'] }));
  },

  async deleteOne(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user.id;
    const entity = await strapi.services['cart-item'].delete({ id, user });
    return sanitizeEntity(entity, { model: strapi.models['cart-item'] });
  },

  async find(ctx) {
    const user = ctx.state.user.id;
    const entities = await strapi.services['cart-item'].find({ user });
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['cart-item'] }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user.id;
    const entity = await strapi.services['cart-item'].findOne({ id, user });
    return sanitizeEntity(entity, { model: strapi.models['cart-item'] });
  },

  async update(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user.id;
    let entity;
    const [item] = await strapi.services['cart-item'].find({ id, user });
    if (!item) {
      return ctx.notFound();
    }
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = user;
      entity = await strapi.services['cart-item'].update({ id }, data, { files });
    } else {
      ctx.request.body.user = user;
      entity = await strapi.services['cart-item'].update({ id }, ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models['cart-item'] });
  },
};
