Select  distinct teachers.name, cohorts.name
FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
      JOIN cohorts ON cohorts.id = cohort_id
where cohorts.name = 'JUL02'
order by teachers.name;