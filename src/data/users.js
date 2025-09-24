const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2b$10$0JKoS7vH6GkDReWu627GdeDhRa1AJdxATJcK4ncIfZKMMPoJ17jgG',
    isAdmin: true,
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2b$10$0JKoS7vH6GkDReWu627GdeDhRa1AJdxATJcK4ncIfZKMMPoJ17jgG',
    isAdmin: false,
  },
  {
    _id: '3',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2b$10$0JKoS7vH6GkDReWu627GdeDhRa1AJdxATJcK4ncIfZKMMPoJ17jgG',
    isAdmin: false,
  },
];

module.exports = users;