// add middlewares here related to actions
const Action = require("./actions-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action not found",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding action",
    });
  }
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({ message: "missing required action field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateActionId,
  validateAction,
};