const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validateZod');
const { z } = require('zod');

const projectCreateSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional()
});

// crear proyecto (archivo opcional)
router.post(
  '/',
  upload.single('file'),           // campo file opcional
  validate(projectCreateSchema),
  projectController.createProject
);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
