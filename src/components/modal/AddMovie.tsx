import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { addMovie } from "../../store/movie.slice";
import { useAppDispatch } from "../../hooks/useTypedSelector";

export default function AddMovie(props: any) {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const [showMovieModal, setShowMovie] = useState(false);
  const [counter, setCounter] = useState(0);
  /* #endregion */

  const onSubmit = async () => {
    const { title, description, imgUrl, cost, yearRelease } = values as any;
    const revenue: number = parseInt(cost);
    const date = new Date(yearRelease);

    const res = await dispatch(
      addMovie({
        title,
        description,
        imgUrl,
        cost: revenue,
        yearRelease: date.toISOString(),
      })
    );

    if (res.payload) {
      alert("Successfully added movie");
      setShowMovie(false);
      setCounter((prev) => prev + 1);
      props.add(counter);
    }
  };

  /* #region  - UTILS */
  const hideAddMovie = () => setShowMovie(false);
  const showAddMovie = () => setShowMovie(true);
  /* #endregion */

  //#region - CUSTOM HOOKS
  const inputCount = 5;

  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "addMovie",
  });
  //#endregion

  return (
    <div>
      <Button
        className="add-review mt-2 mb-3"
        variant="dark"
        onClick={showAddMovie}
      >
        Add movie
      </Button>
      <Modal show={showMovieModal} onHide={hideAddMovie} backdrop="static">
        <Modal.Header>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                onInput={handleChange}
              />
              {errors.title ? (
                <span className="input-error err-name">{errors.title}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter description"
                onInput={handleChange}
              />
              {errors.description ? (
                <span className="input-error err-name">
                  {errors.description}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicImgUrl">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                name="imgUrl"
                placeholder="Enter image url"
                onInput={handleChange}
              />
              {errors.imgUrl ? (
                <span className="input-error err-name">{errors.imgUrl}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicCost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                name="cost"
                placeholder="Enter cost"
                onInput={handleChange}
              />
              {errors.cost ? (
                <span className="input-error err-name">{errors.cost}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Year Release</Form.Label>
              <Form.Control
                type="date"
                name="yearRelease"
                placeholder="Enter year release"
                onInput={handleChange}
              />
              {errors.yearRelease ? (
                <span className="input-error err-name">
                  {errors.yearRelease}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideAddMovie}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Movie
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
