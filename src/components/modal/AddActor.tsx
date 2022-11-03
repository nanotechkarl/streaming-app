import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { addActor, addActorToMovie } from "../../store/movie.slice";
import Select from "react-select";

export default function AddActor(props: any) {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const [showAddModal, setShowActor] = useState(false);
  const { movies, actors }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedActor, setSelectedActor] = useState("");
  const [counter, setCounter] = useState(0);

  /* #endregion */

  //#region - Add actor
  const onSubmit = async () => {
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
      setCounter((prev) => prev + 1);
      props.add(counter);
    }
  };

  const existingSubmit = async () => {
    if (!selectedMovie) {
      alert("Please select a movie");
      return;
    }

    if (!selectedActor) {
      alert("Please select an actor");
      return;
    }

    await dispatch(
      addActorToMovie({
        movieId: selectedMovie,
        actorDetailsId: selectedActor,
      })
    );
    setCounter((prev) => prev + 1);
    props.add(counter);
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
      <Button
        className="add-review mt-2 mb-3"
        variant="dark"
        onClick={showAddActor}
      >
        Add actors to a movie
      </Button>
      <Modal
        show={showAddModal}
        onHide={hideAddActor}
        size="lg"
        backdrop="static"
        className="add-actor-component"
      >
        <Modal.Header>
          <Modal.Title>ADD ACTOR TO MOVIE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicSelect">
              <Form.Label>SELECT MOVIE</Form.Label>
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
            <div className="add-actor mt-4">
              <Row>
                <Col>
                  <h5> ADD EXISTING ACTOR</h5>
                  <Select
                    id="id"
                    placeholder="Select Actor..."
                    className="search-input"
                    getOptionLabel={(option: any) => {
                      return option.firstName + " " + option.lastName;
                    }}
                    getOptionValue={(option: any) => option.id}
                    options={actors}
                    onChange={({ id }) => {
                      setSelectedActor(id);
                    }}
                  />
                  <div className="mt-3">
                    <Button variant="info" onClick={existingSubmit}>
                      Add actor
                    </Button>
                  </div>
                </Col>
                <Col xs={1} className="or">
                  <b>OR</b>
                </Col>
                <Col className="col-new">
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
                      <span className="input-error err-name">
                        {errors.fName}
                      </span>
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
                      <span className="input-error err-name">
                        {errors.fName}
                      </span>
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
                      <span className="input-error err-name">
                        {errors.gender}
                      </span>
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
                  <Button
                    variant="dark"
                    onClick={hideAddActor}
                    className="mr-3"
                  >
                    Close
                  </Button>
                  <Button variant="info" type="submit">
                    Add actor
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
