import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'First name is required.',
      'string.max': 'First name must not exceed 20 characters.',
      'string.pattern.base': 'First name must start with a capital letter.',
    }),
  middleName: Joi.string().max(20).optional().messages({
    'string.max': 'Middle name must not exceed 20 characters.',
  }),
  lastName: Joi.string().alphanum().required().messages({
    'string.base': 'Last name must be a string.',
    'string.empty': 'Last name is required.',
    'string.alphanum': 'Last name must contain only letters and numbers.',
  }),
});

// Joi schema for `guardian` (guardianSchema)
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required.",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required.",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's contact number is required.",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required.",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required.",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's contact number is required.",
  }),
});

// Joi schema for `localGuardian` (localGuardianSchema)
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': "Local guardian's name is required.",
  }),
  occupation: Joi.string().required().messages({
    'string.empty': "Local guardian's occupation is required.",
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': "Local guardian's contact number is required.",
  }),
  address: Joi.string().required().messages({
    'string.empty': "Local guardian's address is required.",
  }),
});
// Joi schema for the main `studentSchema`
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required.',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of the following: male, female, other.',
    'string.empty': 'Gender is required.',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required.',
  }),
  bloogGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'any.only':
        'Blood group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-.',
      'string.empty': 'Blood group is required.',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required.',
  }),
  permanentAddres: Joi.string().required().messages({
    'string.empty': 'Permanent address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked.',
  }),
});

export default studentValidationSchema;
