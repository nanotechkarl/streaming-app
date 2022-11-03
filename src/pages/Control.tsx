import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  deleteMovie,
  editActor,
  editMovie,
  getAllActors,
  getMovies,
} from "../store/movie.slice";
import Table from "../components/table/Table";
import { Col, Row } from "react-bootstrap";
import DeleteModal from "../components/modal/DeleteModal";
import EditMovie from "../components/modal/EditMovie";
import EditActor from "../components/modal/EditActor";

export default function Control() {
  /* #region  - HOOKS */
  const dispatch = useAppDispatch();
  const { movies, actors }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesCounter, setMoviesCounter] = useState(-1);
  const [actorsCount, setActorsCount] = useState(0);
  const [actorsCounter, setActorsCounter] = useState(-1);
  const [deleteMovieState, setDeleteMovieState] = useState(false);
  const [deleteActorState, setDeleteActorState] = useState(false);
  const [deleteFile, setdeleteFile] = useState("");
  const [deleteActor, setdeleteActor] = useState("");
  const [editMovieState, setEditMovieState] = useState(false);
  const [editActorState, setEditActorState] = useState(false);
  const [editedFile, setEditedFile] = useState("");
  const [editedActor, setEditedActor] = useState("");
  const [lastEditedFile, setLastEditedFile] = useState({});
  const [lastEditedActor, setLastEditedActor] = useState({});
  /* #endregion */

  //#region - FETCH
  useEffect(() => {
    fetchMovies();
    setMoviesCount(movies.length);
  }, [moviesCounter, lastEditedFile]); //eslint-disable-line

  useEffect(() => {
    fetchActors();
    setActorsCount(movies.length);
  }, [actorsCounter]); //eslint-disable-line

  const fetchMovies = async () => {
    await dispatch(getMovies());
  };

  const fetchActors = async () => {
    await dispatch(getAllActors());
  };

  //#endregion

  /* #region  - MOVIE CONTROLS */
  const showEditMovie = (file: any) => {
    setEditedFile(file);
    setEditMovieState(true);
  };

  const updateMovie = async (file: any) => {
    const savedFile = await dispatch(
      editMovie({
        movieId: file.movieId,
        imgUrl: file.imgUrl,
        cost: file.cost,
      })
    );
    setLastEditedFile(savedFile);
  };

  const showDeleteMovie = async (file: any) => {
    setDeleteMovieState(true);
    setdeleteFile(file);
  };

  const confirmDeleteMovie = async () => {
    const movieId = deleteFile;

    await dispatch(deleteMovie(movieId));
    setDeleteMovieState(false);
    setMoviesCounter((prev) => prev - 1);
  };
  /* #endregion */

  /* #region  - //TODO ACTOR CONTROLS */
  const showEditActor = (file: any) => {
    setEditedActor(file);
    setEditActorState(true);
  };

  const updateActor = async (file: any) => {
    // const savedFile = await dispatch(
    //   // editActor({
    //   //   movieId: file.movieId,
    //   //   imgUrl: file.imgUrl,
    //   //   cost: file.cost,
    //   // })
    // );
    // setLastEditedActor(savedFile);
  };

  const showDeleteActor = async (actor: any) => {
    setDeleteActorState(true);
    setdeleteActor(actor);
  };

  const confirmDeleteActor = async () => {
    const movieId = deleteActor;

    await dispatch(deleteMovie(movieId));
    setDeleteActorState(false);
    setActorsCounter((prev) => prev - 1);
  };
  /* #endregion */

  //#region - RENDER
  const renderEmptyRowMovie = (count: number) => {
    const emptyRows = 6;
    if (emptyRows - count > 0) {
      return [...Array(emptyRows - count)].map((rows, i) => (
        <tr key={i}>
          <td></td>
          <td></td>
        </tr>
      ));
    }
  };

  const renderEmptyRowActor = (count: number) => {
    const emptyRows = 6;
    if (emptyRows - count > 0) {
      return [...Array(emptyRows - count)].map((rows, i) => (
        <tr key={i}>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ));
    }
  };
  //#endregion

  return (
    <div className="control-page">
      <Row>
        <Col>
          <h3>MOVIES</h3>
          <Table
            header={["TITLE", "YEAR RELEASE", "COST($million)"]}
            keys={["title", "yearRelease", "cost"]}
            data={movies}
            onEdit={showEditMovie}
            onDelete={showDeleteMovie}
            customRender={renderEmptyRowMovie(moviesCount)}
            custom={{ disableDelete: { date: new Date() } }}
          />
          <AddMovie add={(x: any) => setMoviesCounter(x)} />
          <DeleteModal
            onHide={() => setDeleteMovieState(false)}
            handleDelete={confirmDeleteMovie}
            show={deleteMovieState}
          />
          <EditMovie
            onHide={() => setEditMovieState(false)}
            onEdit={updateMovie}
            show={editMovieState}
            file={editedFile}
          />
        </Col>
        <Col>
          <h3> ACTORS </h3>
          <Table
            header={["FIRST NAME", "LAST NAME"]}
            keys={["firstName", "lastName"]}
            functionKey="id"
            data={actors}
            onEdit={showEditActor}
            onDelete={showDeleteActor}
            customRender={renderEmptyRowActor(actorsCount)}
          />
          <AddActor add={(x: any) => setActorsCounter(x)} />
          <DeleteModal
            onHide={() => setDeleteActorState(false)}
            handleDelete={confirmDeleteActor}
            show={deleteActorState}
          />
          <EditActor
            onHide={() => setEditActorState(false)}
            onEdit={updateActor}
            show={editActorState}
            file={editedActor}
          />
        </Col>
      </Row>
    </div>
  );
}
