/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('task').notNullable(); // Task title (required)
    table.text('task_details'); // Detailed description of the task (optional)
    table.integer('priority').notNullable().defaultTo(1); // Task priority (default to 1)
    table.string('completed').notNullable().defaultTo('no'); // Completed status ('yes' or 'no')
  //   table.timestamps(true, true); // Adds `created_at` and `updated_at` with auto-updates
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('tasks'); // Rollback: drop the `tasks` table
}