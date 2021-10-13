const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'bootcampx'
});
const chrtName = [`%${process.argv[2] || 'JUL02'}`];
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like $1
ORDER BY teacher;
`, chrtName)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));