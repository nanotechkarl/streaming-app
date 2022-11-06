import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { alertError, alertWarning } from "../../utils/global";

export default function EditMovie(props) {
  //#region - PROPS
  const { onEdit, file, ...otherProps } = props;
  //#endregion

  //#region - INITIAL INPUT DISPLAY
  useEffect(() => {
    values.imgUrl = props.file.imgUrl;
    values.cost = props.file.cost;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region - SAVE
  function validate() {
    if (!values.imgUrl && !values.cost) {
      alertWarning("No changes made");
      props.onHide();
      return;
    }

    return {
      imgUrl: values.imgUrl || file.imgUrl,
      cost: values.cost || file.cost,
    };
  }

  const onSubmit = async () => {
    const fileObject = validate();
    if (!fileObject) return;
    props.onHide();
    props.onEdit({
      movieId: props.file?.id,
      imgUrl: fileObject.imgUrl,
      cost: fileObject.cost,
    });
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
        <Modal.Title>Upload</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="modal-upload">
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                defaultValue={props.file.imgUrl}
                type="text"
                id="file-description"
                name="imgUrl"
                placeholder="Enter new image url"
                onInput={handleChange}
              />
              {errors.imgUrl ? (
                <p className="input-error">{errors.imgUrl}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost ($million)</Form.Label>
              <Form.Control
                defaultValue={props.file.cost}
                type="text"
                id="movie-cost"
                name="cost"
                placeholder="Enter cost"
                onInput={handleChange}
              />
              {errors.cost ? (
                <p className="input-error">{errors.cost}</p>
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
