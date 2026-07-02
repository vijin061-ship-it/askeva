import { get_active_employees_modal, get_department_count_modal, get_monthly_joined_modal, get_status_distribution_modal, get_total_employees_modal } from "../models/analytics_modal.js";

export const analytics_service = async () => {
  const total = await get_total_employees_modal();
  const active = await get_active_employees_modal();
  const department = await get_department_count_modal();
  const status = await get_status_distribution_modal();
  const monthly = await get_monthly_joined_modal();

  return {
    total: total.total_employees,
    active: active.active_employees,
    department,
    status,
    monthly,
  };
};