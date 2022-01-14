// Write your "actions" router here!
const express = require("express");
const { validateActionId, validateAction } = require("./actions-middlware");

const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(() => {
      return Action.get(req.params.id);
    })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateActionId, async (req, res, next) => {
  try {
    const end = await Action.getUserPosts(req.params.id);
    res.json(end);
  } catch (err) {
    next(err);
  }
});

module.exports = router;