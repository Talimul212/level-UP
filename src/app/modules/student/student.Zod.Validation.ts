import { z } from 'zod';

// Zod schema for `name` (userNameSchema)
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot exceed 20 characters.' })
    .nonempty({ message: 'First name is required.' })
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First name must start with a capital letter.',
    }),
  middleName: z
    .string()
    .max(20, { message: 'Middle name cannot exceed 20 characters.' })
    .optional(),
  lastName: z
    .string()
    .nonempty({ message: 'Last name is required.' })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: 'Last name must be alphanumeric.',
    }),
});

// Zod schema for `guardian` (guardianSchema)
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required." }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required." }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required." }),
  motherName: z.string().nonempty({ message: "Mother's name is required." }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required." }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required." }),
});

// Zod schema for `localGuardian` (localGuardianSchema)
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required." }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required." }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required." }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required." }),
});

// Zod schema for the main `studentSchema`
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'Student ID is required.' }),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  contactNo: z.string().nonempty({ message: 'Contact number is required.' }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: 'Emergency contact number is required.' }),
  bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z
    .string()
    .nonempty({ message: 'Present address is required.' }),
  permanentAddres: z
    .string()
    .nonempty({ message: 'Permanent address is required.' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export { studentValidationSchema };
