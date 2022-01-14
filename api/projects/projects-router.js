// Write your "projects" router here!
const express = require("express");
const { validateProjId, validateProj } = require("./projects-middleware");

const Project = require("./projects-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProj, (req, res, next) => {
  Project.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjId, validateProj, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(() => {
      return Project.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

module.exports = router;