import { checkSchema, validationResult } from 'express-validator';

const validate = (schema) => async (req, res, next) => {
  try {
    await checkSchema(schema).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
