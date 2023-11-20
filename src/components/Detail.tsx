import React from "react";
import { Formik, Field, Form } from "formik";
import { FiFlag } from "react-icons/fi";

enum Priority {
  Low,
  Medium,
  High,
}

interface DetailProps {
  title: string;
  dueDate?: Date;
  shortDescription?: string;
  description?: string;
  priority?: Priority;
}

const Detail = ({
  title,
  dueDate = new Date(),
  shortDescription = "",
  description = "",
  priority = Priority.Low,
}: DetailProps) => {

  return (
    <Formik
      initialValues={{ title, dueDate, shortDescription, description, priority }}
      onSubmit={values => { /* implement your submission logic here */ }}
      enableReinitialize
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <h1 className="text-white">Title:</h1>
            <Field
              name="title"
              type="text"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-lg bg-[#3a3d49] text-white !outline-neutral-400"
            />
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-white">Due:</h1>
            <Field
              name="dueDate"
              type="date"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-lg bg-[#3a3d49] text-white !outline-neutral-400"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-white font-medium text-lg">Short Description</h1>
            <Field
              as="textarea"
              name="shortDescription"
              className="textarea bg-[#3a3d49] text-white !outline-neutral-400 h-40"
              placeholder="Type here"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-white font-medium text-lg">Description</h1>
            <Field
              as="textarea"
              name="description"
              className="textarea bg-[#3a3d49] text-white !outline-neutral-400 h-64"
              placeholder="Type here"
            />
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-white">Priority:</h1>
            <FiFlag
              className={`text-[#50af53] text-2xl cursor-pointer ${
                values.priority === Priority.Low && "fill-[#50af53]"
              }`}
              onClick={() => setFieldValue('priority', Priority.Low)}
            />
            <FiFlag
              className={`text-[#c29b4a] text-2xl cursor-pointer ${
                values.priority === Priority.Medium && "fill-[#c29b4a]"
              }`}
              onClick={() => setFieldValue('priority', Priority.Medium)}
            />
            <FiFlag
              className={`text-[#e4481b] text-2xl cursor-pointer ${
                values.priority === Priority.High && "fill-[#e4481b]"
              }`}
              onClick={() => setFieldValue('priority', Priority.High)}
            />
          </div>
          <button
  type="button"
  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit();
  }}
  className="btn btn-primary mt-4"
  style={{ width: "100px" }} // Adjust the width as needed
>
  Update
</button>
        </Form>
      )}
    </Formik>
  );
};

export default Detail;
