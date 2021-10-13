const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'Vagrant1!',
  host: 'localhost',
  port: 5432,
  database: 'bootcampx'
});

const values = [`${process.argv[2]}`]

pool.query(`
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, COUNT(assistance_requests.*) as total_assistances
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name = $1
  GROUP BY teachers.name, cohorts.name
  ORDER BY total_assistances DESC;
`, values)
.then(res => {
  res.rows.forEach(data => {
    console.log(`${data.cohort}: ${data.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));