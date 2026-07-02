import { analytics_service } from "../service/analytics_server.js";


export const analytics_controller = async (req, res) => {
  try {
    const data = await analytics_service();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};