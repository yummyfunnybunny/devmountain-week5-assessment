-- PROBLEM 1
SELECT email 
FROM customers 
ORDER BY email;

-- PROBMEL 2
SELECT id 
FROM orders 
WHERE customer_id = (
  SELECT id 
  FROM customers 
  WHERE fname = 'Elizabeth' 
  AND lname = 'Crocker'
);

-- PROBLEM 3
SELECT sum(num_cupcakes) 
FROM orders 
WHERE processed = 'f';

-- PROBLEM 4
SELECT c.name, sum(o.num_cupcakes) 
FROM cupcakes AS c 
LEFT JOIN orders AS o 
ON c.id = o.cupcake_id 
GROUP BY c.name 
ORDER BY c.name ASC;

-- PROBLEM 5
SELECT c.email, sum(o.num_cupcakes) 
FROM customers AS c 
JOIN orders AS o 
ON c.id = o.customer_id
GROUP BY c.email 
ORDER BY sum(o.num_cupcakes) DESC;

-- PROBLEM 6
SELECT c.fname, c.lname, c.email 
FROM customers AS c 
JOIN orders AS o 
ON c.id = o.customer_id 
WHERE o.processed = 't' 
AND o.cupcake_id = (
  SELECT id 
  FROM cupcakes 
  WHERE name = 'funfetti') 
GROUP BY c.fname, c.lname, c.email;




