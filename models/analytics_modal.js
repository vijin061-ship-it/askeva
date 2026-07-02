import pool from "../config/db.js";

export const get_total_employees_modal = async () => {
  const result = await pool.query(`
    SELECT COUNT(*) AS total_employees FROM employees
  `);

  return result.rows[0];
};

export const get_active_employees_modal = async () => {
  const result = await pool.query(`
    SELECT COUNT(*) AS active_employees
    FROM employees
    WHERE status = 'Active'
  `);

  return result.rows[0];
};

export const get_department_count_modal = async () => {
  const result = await pool.query(`
    SELECT department, COUNT(*) AS count
    FROM employees
    GROUP BY department
    ORDER BY count DESC
  `);

  return result.rows;
};

export const get_status_distribution_modal = async () => {
  const result = await pool.query(`
    SELECT status, COUNT(*) AS count
    FROM employees
    GROUP BY status
  `);

  return result.rows;
};

export const get_monthly_joined_modal = async () => {
  const result = await pool.query(`
    SELECT
      TO_CHAR(joining_date, 'YYYY-MM') AS month,
      COUNT(*) AS count
    FROM employees
    GROUP BY month
    ORDER BY month ASC
  `);

  return result.rows;
};