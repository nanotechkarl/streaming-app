import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { alertWarning } from "../../utils/global";
import { Users } from "../../store/types";

interface ValidUser {
  firstName: string;
  lastName: string;
  permissions: string[];
}

interface Edit {
  onHide: any;
  onEdit: CallableFunction;
  show: boolean;
  user: Users;
}

export default function EditUser(props: Edit) {
  //#region - PROPS
  const { onEdit, user, ...otherProps } = props;
  //#endregion

  //#region - INITIAL INPUT DISPLAY
  useEffect(() => {
    values.fName = user.firstName;
    values.lName = user.lastName;
    values.permissions = user.permissions;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region - SAVE
  function validate() {
    if (!values.fName && !values.lName && !values.permissions) {
      alertWarning("No changes made");
      props.onHide();
      return;
    }

    if (values.permissions) {
      return {
        firstName: values.fName || user.firstName,
        lastName: values.lName || user.lastName,
        permissions: [values.permissions],
      };
    }

    return {
      firstName: values.fName || user.firstName,
      lastName: values.lName || user.lastName,
      permissions: values.permissions || user.permissions,
    };
  }

  const onSubmit = async () => {
    const fileObject: ValidUser | undefined = validate();
    if (!fileObject) return;
    props.onEdit({
      userId: props.user.id,
      firstName: fileObject.firstName,
      lastName: fileObject.lastName,
      permissions: fileObject.permissions,
    });
    props.onHide();
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
  });
  //#endregion

  return (
    <Modal {...otherProps} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Edit Actor</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="modal-upload">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                defaultValue={props.user.firstName}
                type="text"
                id="file-description"
                name="fName"
                placeholder="Enter first name"
                onInput={handleChange}
              />
              {errors.fName ? (
                <p className="input-error err-name">{errors.fName}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                defaultValue={props.user.lastName}
                type="text"
                id="movie-cost"
                name="lName"
                placeholder="Enter last name"
                onInput={handleChange}
              />
              {errors.lName ? (
                <p className="input-error err-name">{errors.lName}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </Form.Group>
            <div>
              <span> Permission </span>
              <Form.Check
                className="radio"
                inline
                label="User"
                name="permissions"
                type="radio"
                id={`radio-admin`}
                value="user"
                defaultChecked={props.user?.permissions?.includes("user")}
                onInput={handleChange}
              />
              <Form.Check
                className="radio"
                inline
                label="Admin"
                name="permissions"
                type="radio"
                id={`radio-admin`}
                value="admin"
                onInput={handleChange}
                defaultChecked={props.user?.permissions?.includes("admin")}
              />
              {errors.permissions ? (
                <span className="input-error err-name">
                  {errors.permissions}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="upload-footer">
            <div>
              <Button
                className="button-primary mt-3"
                type="submit"
                variant="info"
              >
                Save
              </Button>
              <Button
                type="button"
                className="button-primary mt-3 ml-2"
                variant="secondary"
                onClick={props.onHide}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
