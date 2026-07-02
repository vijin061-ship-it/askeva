import { get_all_employees_service, create_employee_service, update_employee_service, delete_employee_service } from "../service/employee_services.js";



export const get_all_employees_controller = async (req, res) => {
  try {
    const employees = await get_all_employees_service(req.query);

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const create_employee_controller = async (req, res) => {
  try {
    const employee = await create_employee_service(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update_employee_controller = async (req, res) => {
  try {
    const employee = await update_employee_service(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const delete_employee_controller = async (req, res) => {
  try {
    await delete_employee_service(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};