import { useState } from "react";
import { omit } from "lodash";

interface ObjectAny {
  [key: string]: any;
}

const useForm = ({
  callback,
  inputCount = 1,
  inputType = "",
  useValidation = true,
}: any) => {
  //#region - STATES
  const [values, setValues] = useState<ObjectAny>({});
  const [errors, setErrors] = useState<ObjectAny>({});
  //#endregion

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
      case "name":
        conditionCase(value.length === 0, " Please enter your name", name);
        break;

      case "confirmPassword":
        conditionCase(value.length === 0, " Please enter your name", name);
        break;

      case "email":
        conditionCase(
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value),
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
      errorsEmpty = {};
    } else {
      customForm(inputType, errorsEmpty);

      setErrors({
        ...errors,
        ...errorsEmpty,
      });
    }
  };

  const customForm = (inputType: string, errorsEmpty: ObjectAny) => {
    switch (inputType) {
      case "register":
        if (!values.name) {
          errorsEmpty.name = `Please enter your name`;
        }

        if (!values.email) {
          errorsEmpty.email = `Enter a vaild email address`;
        }

        if (!values.password) {
          errorsEmpty.password = `Please enter your password`;
        }

        if (!values.confirmPassword) {
          errorsEmpty.confirmPassword = `Please confirm your password`;
        }
        break;

      default:
        break;
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

export default useForm;
