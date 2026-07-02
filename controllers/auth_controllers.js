import { login_service } from "../service/auth_service.js";

export const login_controller = async (req, res) => {
  try {
    const result = await login_service(req.body);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};