import { Knex } from 'knex';
import { Tables } from '../types/tables';
import { onDeleteWithCascadeWhenDev } from '../utils';

function createTableCategory(table: Knex.CreateTableBuilder) {
  table.increments('category_id').primary();
  table.text('name').notNullable();
}

function createTableProduct(table: Knex.CreateTableBuilder) {
  table.increments('product_id').primary();
  table.text('name').notNullable();
  table.text('description').notNullable();
  table.float('price').notNullable();
  table.float('discount_price').nullable();
  table.boolean('is_offer').nullable();
  table.boolean('is_visible').nullable();
  table.text('img_url').nullable();
  table.text('secondary_img_url').nullable();
  table.text('banner_img_url').nullable();
  table.integer('quantity').notNullable();
  onDeleteWithCascadeWhenDev(
    table
      .integer('category_id')
      .references('category_id')
      .inTable(Tables.CATEGORY)
  );
  table.timestamps({ defaultToNow: true });
}

function createTableOrder(table: Knex.CreateTableBuilder) {
  table.uuid('order_id').primary();
  table.text('address');
  table.text('client_name');
  table.integer('phone');
  table.text('email');
  table.integer('district_id');
  table.integer('province_id');
  table.integer('department_id');

  onDeleteWithCascadeWhenDev(
    table
      .integer('order_status_id')
      .references('order_status_id')
      .inTable(Tables.ORDER_STATUS)
  );

  onDeleteWithCascadeWhenDev(
    table
      .integer('payment_method_id')
      .references('payment_method_id')
      .inTable(Tables.PAYMENT_METHOD)
  );

  onDeleteWithCascadeWhenDev(
    table
      .integer('district_id')
      .references('district_id')
      .inTable(Tables.DISTRICT)
  )

  table.timestamps({ defaultToNow: true });
}

function createTableFeatured(table: Knex.CreateTableBuilder) {
  table.increments('featured_id').primary();
  table.text('title').nullable();
  table.text('description').nullable();
  table.integer('product_id').nullable();
  table.text('banner_img_url').nullable();
  table.float('offer_price').nullable();
  table.float('price').notNullable();
  table.boolean('is_offer').nullable();
}

function createTableOrderStatus(table: Knex.CreateTableBuilder) {
  table.increments('order_status_id');
  table.text('name');
}

function createTablePaymentMethod(table: Knex.CreateTableBuilder) {
  table.increments('payment_method_id');
  table.text('name').notNullable();
}

function createTableOrderProduct(table: Knex.CreateTableBuilder) {
  onDeleteWithCascadeWhenDev(
    table.integer('product_id').references('product_id').inTable(Tables.PRODUCT)
  );

  onDeleteWithCascadeWhenDev(
    table.uuid('order_id').references('order_id').inTable(Tables.ORDER)
  );

  table.integer('quantity');
  table.primary(['product_id', 'order_id']);
}

function createTableDistrict(table: Knex.CreateTableBuilder) {
  table.increments('district_id').primary();
  table.text('name').notNullable();
  onDeleteWithCascadeWhenDev(
    table.
      integer('province_id')
      .references('province_id')
      .inTable(Tables.PROVINCE)
      .notNullable()

  )
}

function createTableProvince(table: Knex.CreateTableBuilder) {
  table.increments('province_id').primary();
  table.text('name').notNullable();
  onDeleteWithCascadeWhenDev(
    table
      .integer('department_id')
      .references('department_id')
      .inTable(Tables.DEPARTMENT)
      .notNullable()
  );
}

function createTableDepartment(table: Knex.CreateTableBuilder) {
  table.increments('department_id').primary();
  table.text('name').notNullable();
}

export async function up(knex: Knex) {
  return await knex.schema
    .createTable(Tables.CATEGORY, createTableCategory)
    .createTable(Tables.PRODUCT, createTableProduct)
    .createTable(Tables.FEATURED, createTableFeatured)
    .createTable(Tables.ORDER_STATUS, createTableOrderStatus)
    .createTable(Tables.PAYMENT_METHOD, createTablePaymentMethod)
    .createTable(Tables.DEPARTMENT, createTableDepartment)
    .createTable(Tables.PROVINCE, createTableProvince)
    .createTable(Tables.DISTRICT, createTableDistrict)
    .createTable(Tables.ORDER, createTableOrder)
    .createTable(Tables.ORDER_PRODUCT, createTableOrderProduct);
}

export async function down(knex: Knex) {
  return await knex.schema
    .dropTableIfExists(Tables.ORDER_PRODUCT)
    .dropTableIfExists(Tables.ORDER)
    .dropTableIfExists(Tables.DISTRICT)
    .dropTableIfExists(Tables.PROVINCE)
    .dropTableIfExists(Tables.DEPARTMENT)
    .dropTableIfExists(Tables.PAYMENT_METHOD)
    .dropTableIfExists(Tables.ORDER_STATUS)
    .dropTableIfExists(Tables.FEATURED)
    .dropTableIfExists(Tables.PRODUCT)
    .dropTableIfExists(Tables.CATEGORY);
}
