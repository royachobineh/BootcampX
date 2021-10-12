
Select  day, sum(duration), count(id)
FROM assignments
GROUP by day
ORDER by day;
