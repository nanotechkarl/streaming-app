import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { alertWarning } from "../../utils/global";
import { Actors } from "../../store/types";

interface Edit {
  onHide: any;
  onEdit: CallableFunction;
  show: boolean;
  actor: Actors;
}

export default function EditActor(props: Edit) {
  //#region - PROPS
  const { onEdit, actor, ...otherProps } = props;
  //#endregion

  //#region - INITIAL INPUT DISPLAY
  useEffect(() => {
    values.fName = actor.firstName;
    values.lName = actor.lastName;
    values.gender = actor.gender;
    values.age = actor.age;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region - SAVE
  function validate() {
    if (!values.fName && !values.lName && !values.gender && !values.age) {
      alertWarning("No changes made");
      props.onHide();
      return;
    }

    return {
      firstName: values.fName || actor.firstName,
      lastName: values.lName || actor.lastName,
      gender: values.gender || actor.gender,
      age: values.age || actor.age,
    };
  }

  const onSubmit = async () => {
    const fileObject = validate();
    if (!fileObject) return;
    props.onEdit({
      actorId: props.actor?.id,
      firstName: fileObject.firstName,
      lastName: fileObject.lastName,
      gender: fileObject.gender,
      age: fileObject.age,
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
                defaultValue={props.actor.firstName}
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
                defaultValue={props.actor.lastName}
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
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                defaultValue={props.actor.gender}
                type="text"
                id="movie-cost"
                name="gender"
                placeholder="Enter gender"
                onInput={handleChange}
              />
              {errors.gender ? (
                <p className="input-error err-name">{errors.gender}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                defaultValue={props.actor.age}
                type="text"
                id="movie-cost"
                name="age"
                placeholder="Enter age"
                onInput={handleChange}
              />
              {errors.age ? (
                <p className="input-error err-name">{errors.age}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </Form.Group>
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
