import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { addActor, addActorToMovie } from "../../store/movie.slice";
import Select from "react-select";

export default function AddActor() {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const [showAddModal, setShowActor] = useState(false);
  const { movies }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const [selectedMovie, setSelectedMovie] = useState("");
  /* #endregion */

  //#region - Add actor
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { fName, lName, gender, age } = values as any;
    if (!selectedMovie) {
      alert("Please select a movie");
      return;
    }

    const res = await dispatch(
      addActor({
        firstName: fName,
        lastName: lName,
        gender,
        age: parseInt(age),
      })
    );

    if (res.payload) {
      const obj: any = res.payload; //REVIEW TECHNIQUE TO BYPASS OBJECT TYPING
      const actorDetailsId = obj.data.data.id;
      await dispatch(
        addActorToMovie({
          movieId: selectedMovie,
          actorDetailsId,
        })
      );
    }
  };
  //#endregion

  /* #region  - UTILS */
  const hideAddActor = () => setShowActor(false);
  const showAddActor = () => setShowActor(true);
  /* #endregion */

  //#region - CUSTOM HOOKS
  const inputCount = 4;
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "addActor",
  });
  //#endregion

  return (
    <div>
      <Button className="add-review" variant="dark" onClick={showAddActor}>
        Add actors to a movie
      </Button>
      <Modal
        show={showAddModal}
        onHide={hideAddActor}
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>ADD ACTOR TO MOVIE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicSelect">
              <Form.Label>Select Movie</Form.Label>
              <Select
                id="id"
                placeholder="Select Movie..."
                className="search-input"
                getOptionLabel={(option: any) => option.title}
                getOptionValue={(option: any) => option.id}
                options={movies}
                onChange={({ id }) => {
                  setSelectedMovie(id);
                }}
              />
            </Form.Group>
            {/* <h5> ADD EXISTING ACTOR</h5> */}
            {/* <h5>-OR-</h5> */}
            <h5> ADD NEW ACTOR </h5>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fName"
                placeholder="Enter first name"
                onInput={handleChange}
              />
              {errors.fName ? (
                <span className="input-error err-name">{errors.fName}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lName"
                placeholder="Enter Last name"
                onInput={handleChange}
              />
              {errors.fName ? (
                <span className="input-error err-name">{errors.fName}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                placeholder="Enter gender"
                onInput={handleChange}
              />
              {errors.gender ? (
                <span className="input-error err-name">{errors.gender}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                placeholder="Enter age"
                onInput={handleChange}
              />
              {errors.age ? (
                <span className="input-error err-name">{errors.age}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideAddActor}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add actor
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
