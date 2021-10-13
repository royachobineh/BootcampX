const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'Vagrant1!',
  host: 'localhost',
  port: 5432,
  database: 'bootcampx'
});

const values = [`%${process.argv[2]}%`, process.argv[3]]

pool.query(`
  SELECT students.id, students.name, cohorts.name as cohort_name
  FROM students
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));