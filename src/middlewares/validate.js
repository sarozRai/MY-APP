
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: result.error.format(),
    });
  }

  req.body = result.data;

  next();
};

export default validate;
