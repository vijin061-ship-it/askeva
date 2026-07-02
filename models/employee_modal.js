// models/employeeModel.js

import pool from "../config/db.js";

export const get_all_employees_model = async ({
  search = "",
  department = "",
  status = "",
  page = 1,
  limit = 10,
}) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT
      id,
      CONCAT(first_name, ' ', last_name) AS employee_name,
      email,
      department,
      designation,
      status,
      joining_date
    FROM employees
    WHERE 1=1
  `;

  const values = [];
  let index = 1;

  if (search) {
    query += `
      AND (
        CONCAT(first_name, ' ', last_name) ILIKE $${index}
        OR email ILIKE $${index}
      )
    `;
    values.push(`%${search}%`);
    index++;
  }

  if (department) {
    query += ` AND department = $${index}`;
    values.push(department);
    index++;
  }

  if (status) {
    query += ` AND status = $${index}`;
    values.push(status);
    index++;
  }

  query += ` ORDER BY id ASC LIMIT $${index} OFFSET $${index + 1}`;
  values.push(limit, offset);

  const result = await pool.query(query, values);

  // total count for pagination UI
  const countResult = await pool.query(`
    SELECT COUNT(*) FROM employees
  `);

  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count),
    page: Number(page),
    limit: Number(limit),
  };
};

export const create_employee_model = async (data) => {
  const { first_name, last_name, email, phone, department, designation, salary, status, joining_date, address } = data;

  const result = await pool.query(
    `
    INSERT INTO employees
    (first_name,last_name,email,phone,department,designation,salary,status,joining_date,address)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [first_name, last_name, email, phone, department, designation, salary, status, joining_date, address]
  );

  return result.rows[0];
};

export const update_employee_model = async (id, data) => {
  const { first_name, last_name, email, phone, department, designation, salary, status, joining_date, address } = data;

  const result = await pool.query(
    `
    UPDATE employees
    SET first_name=$1,last_name=$2,email=$3,phone=$4,department=$5,designation=$6,salary=$7,status=$8,joining_date=$9,address=$10 WHERE id=$11
    RETURNING *
    `,
    [first_name, last_name, email, phone, department, designation, salary, status, joining_date, address, id]
  );

  return result.rows[0];
};

export const delete_employee_model = async (id) => {
  await pool.query(
    "DELETE FROM employees WHERE id = $1",
    [id]
  );
};