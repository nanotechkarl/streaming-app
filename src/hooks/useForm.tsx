import { useState, useEffect } from "react";
import { omit } from "lodash";
import { regex } from "../utils/global";

interface ObjectAny {
  [key: string]: any;
}

const useForm = ({
  callback,
  inputCount = 1,
  inputType = "",
  useValidation = true,
  resetValues = false,
}: any) => {
  //#region - STATES
  const [values, setValues] = useState<ObjectAny>({});
  const [errors, setErrors] = useState<ObjectAny>({});
  //#endregion

  useEffect(() => {
    if (resetValues) {
      setValues({});
      setErrors({});
    }
  }, [resetValues]);

  //#region - VALIDATE
  const conditionCase = (condition: any, message: string, name: string) => {
    if (condition) {
      setErrors({
        ...errors,
        [name]: message,
      });
    } else {
      let newObj = omit(errors, name);
      setErrors(newObj);
    }
  };

  const validate = (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    value: string
  ) => {
    switch (name) {
      case "title":
      case "description":
      case "imgUrl":
      case "yearRelease":
      case "message":
      case "gender":
      case "permissions":
        conditionCase(value.length === 0, ` Please enter ${name}`, name);
        break;

      case "cost":
      case "age":
        conditionCase(
          value.length === 0 || !new RegExp(regex.number).test(value),
          ` Please enter valid ${name}`,
          name
        );

        break;

      case "fName":
        conditionCase(value.length === 0, " Please enter first name", name);
        break;

      case "lName":
        conditionCase(value.length === 0, " Please enter last name", name);
        break;

      case "email":
        conditionCase(
          !new RegExp(regex.email).test(value),
          "Enter a valid email address",
          name
        );
        break;

      case "password":
        conditionCase(
          value.length < 8,
          "Password must be 8 characters minimum",
          name
        );
        break;

      case "cPassword":
        conditionCase(
          value.length === 0,
          " Please confirm your password",
          name
        );
        break;

      case "role":
        conditionCase(value.length === 0, " Please choose role", name);
        break;

      default:
        break;
    }
  };
  //#endregion

  //#region - HANDLERS, CUSTOM VALIDATION
  const handleChange = (event: any) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    if (useValidation) {
      validate(event, name, val);
    }

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    let errorsEmpty = {};

    if (
      Object.keys(errors).length === 0 &&
      Object.keys(values).length >= inputCount
    ) {
      callback();
    } else {
      customForm(inputType, errorsEmpty, values);

      setErrors({
        ...errors,
        ...errorsEmpty,
      });
    }
  };

  //#endregion

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

const customForm = (iType: string, errorsEmpty: ObjectAny, inputs: any) => {
  switch (iType) {
    case "review":
      if (!inputs.message) {
        errorsEmpty.message = `Please enter review`;
      }
      break;
    case "register":
      registerValidations(inputs, errorsEmpty);
      break;

    case "addMovie":
      if (!inputs.title) {
        errorsEmpty.title = `Please enter title`;
      }
      if (!inputs.description) {
        errorsEmpty.description = `Please enter description`;
      }

      if (!inputs.imgUrl) {
        errorsEmpty.imgUrl = `Please enter image url`;
      }

      if (!inputs.cost) {
        errorsEmpty.cost = `Please enter cost`;
      }

      if (!inputs.yearRelease) {
        errorsEmpty.yearRelease = `Please choose date`;
      }

      break;

    case "addActor":
      addActorValidations(inputs, errorsEmpty);

      break;

    default:
      break;
  }
};

const registerValidations = (values: any, errorsEmpty: any) => {
  if (!values.fName) {
    errorsEmpty.fName = `Please enter your first name`;
  }

  if (!values.lName) {
    errorsEmpty.lName = `Please enter your last name`;
  }

  if (!values.email) {
    errorsEmpty.email = `Enter a vaild email address`;
  }

  if (!values.password) {
    errorsEmpty.password = `Password must be 8 characters minimum`;
  }

  if (!values.cPassword) {
    errorsEmpty.cPassword = `Please confirm your password`;
  }
};

const addActorValidations = (values: any, errorsEmpty: any) => {
  if (!values.fName) {
    errorsEmpty.fName = `Please enter first name`;
  }
  if (!values.lName) {
    errorsEmpty.lName = `Please enter last name`;
  }

  if (!values.gender) {
    errorsEmpty.gender = `Please enter gender`;
  }

  if (!values.age) {
    errorsEmpty.age = `Please enter age`;
  }

  if (!values.imgUrl) {
    errorsEmpty.imgUrl = `Please enter image url`;
  }
};

export default useForm;
