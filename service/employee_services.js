import { get_all_employees_model, create_employee_model, update_employee_model, delete_employee_model } from "../models/employee_modal.js";


export const get_all_employees_service = async (query) => {
  return await get_all_employees_model(query);
};

export const create_employee_service = async (data) => {
  try {
    return await create_employee_model(data);
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }

    throw error;
  }
};
export const update_employee_service = async (id, data) => {
  return await update_employee_model(id, data);
};

export const delete_employee_service = async (id) => {
  return await delete_employee_model(id);
};