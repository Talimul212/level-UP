import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidationSchema } from './student.Zod.Validation';
// import studentValidationSchema from './student.Joi.Validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using joi

    // Joi schema for `name` (userNameSchema)
    //creating a schema validation using zod

    const { student: studentData } = req.body;
    // const { error, value } = studentValidationSchema.validate(studentData);

    ///Zod validation
    const sodStudentData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(sodStudentData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went worng',
    //     data: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: 'something went worng',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
