export async function seed(knex) {
  await knex('tasks').insert([
    {
      id: 1,
      task: 'Buy groceries',
      task_details: 'Buy milk, eggs, and bread from the supermarket.',
      priority: 2,
      completed: 'no',
    },
    {
      id: 2,
      task: 'Finish homework',
      task_details: 'Complete the math and science assignments.',
      priority: 1,
      completed: 'yes',
    },
    {
      id: 3,
      task: 'Call the bank',
      task_details: 'Inquire about recent charges on the credit card.',
      priority: 3,
      completed: 'no',
    },
    {
      id: 4,
      task: 'Clean the house',
      task_details: 'Vacuum, dust, and organize the living room and kitchen.',
      priority: 2,
      completed: 'yes',
    },
    {
      id: 5,
      task: 'Schedule doctor appointment',
      task_details: 'Call the clinic to schedule an annual check-up.',
      priority: 3,
      completed: 'no',
    },
  ]);
}