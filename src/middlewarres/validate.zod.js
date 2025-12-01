module.exports = (schema) => (req, res, next) => {
  try {
    // validar body; si quieres params o query, validarlos separado
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (err) {
    // ZodError
    return res.status(400).json({ error: err.errors ?? err.message });
  }
};
