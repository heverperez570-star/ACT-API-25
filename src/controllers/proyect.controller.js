const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// si necesitas usar el pool mysql2 para query crudo: const pool = require('../utils/dbPool');

exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // multer añade req.file si subió archivo
    const filePath = req.file ? req.file.path : null;

    const project = await prisma.project.create({
      data: { title, description, filePath }
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }});
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
