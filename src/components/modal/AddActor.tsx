import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { addActor, addActorToMovie } from "../../store/actor.slice";
import Select, { SingleValue } from "react-select";
import { alertError } from "../../utils/global";
import { Actors, Movies } from "../../store/types";

export interface Props {
  add: any;
}

export default function AddActor(props: Props) {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  const { movies }: { movies: Movies[] } = useAppSelector(
    (state) => state.movie
  );
  const { actors }: { actors: Actors[] } = useAppSelector(
    (state) => state.actor
  );
  const [showAddModal, setShowActor] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedActor, setSelectedActor] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);

  /* #endregion */

  //#region - Add actor
  const onSubmit = async () => {
    const { fName, lName, gender, age, imgUrl } = values;
    if (!selectedMovie) {
      alertError("Please select a movie");
      return;
    }
    const res = await dispatch(
      addActor({
        firstName: fName,
        lastName: lName,
        gender,
        age,
        imgUrl,
      })
    );

    if (res.payload) {
      const obj: any = res.payload;
      const actorDetailsId: string = obj.data?.data?.id;
      await dispatch(
        addActorToMovie({
          id: selectedMovie,
          actorDetailsId,
        })
      );
      setCounter((prev: number) => prev + 1);
      props.add(counter);
    }
  };

  const existingSubmit = async () => {
    if (!selectedMovie) {
      alertError("Please select a movie");
      return;
    }

    if (!selectedActor) {
      alertError("Please select an actor");
      return;
    }

    await dispatch(
      addActorToMovie({
        movieId: selectedMovie,
        actorDetailsId: selectedActor,
      })
    );
    setCounter((prev: number) => prev + 1);
    props.add(counter);
  };
  //#endregion

  /* #region  - UTILS */
  const hideAddActor = () => setShowActor(false);
  const showAddActor = () => setShowActor(true);
  /* #endregion */

  //#region - CUSTOM HOOKS
  const inputCount: number = 5;
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "addActor",
    resetValues: showAddModal,
  });
  //#endregion

  const renderError = (error: any, name: string) => {
    return error[name] ? (
      <span className="input-error err-name">{error[name]}</span>
    ) : (
      <span>&nbsp;</span>
    );
  };

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
                getOptionLabel={(option: Movies) => option.title}
                getOptionValue={(option: Movies) => option.id}
                options={movies}
                onChange={(option: SingleValue<Movies> | null) => {
                  if (option) setSelectedMovie(option.id);
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
                    getOptionLabel={(option: Actors) => {
                      return option.firstName + " " + option.lastName;
                    }}
                    getOptionValue={(option: Actors) => option.id}
                    options={actors}
                    onChange={(option: SingleValue<Actors> | null) => {
                      if (option) setSelectedActor(option.id);
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
                    {renderError(errors, "fName")}
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lName"
                      placeholder="Enter Last name"
                      onInput={handleChange}
                    />
                    {renderError(errors, "lName")}
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      placeholder="Enter gender"
                      onInput={handleChange}
                    />
                    {renderError(errors, "gender")}
                  </Form.Group>
                  <Form.Group controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      name="age"
                      placeholder="Enter age"
                      onInput={handleChange}
                    />
                    {renderError(errors, "age")}
                  </Form.Group>
                  <Form.Group controlId="formBasicAge">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="imgUrl"
                      placeholder="Enter image URL"
                      onInput={handleChange}
                    />
                    {renderError(errors, "imgUrl")}
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
