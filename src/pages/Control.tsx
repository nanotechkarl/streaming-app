import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  deleteCelebrity,
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
import { approveUser, getUsers } from "../store/user.slice";

export default function Control() {
  /* #region  - HOOKS */
  const dispatch = useAppDispatch();
  const { movies, actors }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const { accounts }: { [key: string]: any } = useAppSelector(
    (state) => state.user
  );
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesCounter, setMoviesCounter] = useState(-1);
  const [actorsCount, setActorsCount] = useState(0);
  const [actorsCounter, setActorsCounter] = useState(-1);
  const [usersCount, setUsersCount] = useState(0);
  const [usersCounter, setUsersCounter] = useState(-1);
  const [deleteMovieState, setDeleteMovieState] = useState(false);
  const [deleteActorState, setDeleteActorState] = useState(false);
  const [deleteUserState, setDeleteUserState] = useState(false);
  const [deleteFile, setdeleteFile] = useState("");
  const [deleteActor, setdeleteActor] = useState("");
  const [deleteUser, setdeleteUser] = useState("");
  const [editMovieState, setEditMovieState] = useState(false);
  const [editActorState, setEditActorState] = useState(false);
  const [editUserState, setEditUserState] = useState(false);

  const [editedFile, setEditedFile] = useState("");
  const [editedActor, setEditedActor] = useState("");
  const [editedUser, setEditedUser] = useState("");

  const [lastEditedFile, setLastEditedFile] = useState({});
  const [lastEditedActor, setLastEditedActor] = useState({});
  const [lastEditedUser, setLastEditedUser] = useState({});

  /* #endregion */

  //#region - FETCH
  useEffect(() => {
    fetchMovies();
    setMoviesCount(movies.length);
  }, [moviesCounter, lastEditedFile]); //eslint-disable-line

  useEffect(() => {
    fetchActors();
    setActorsCount(actors.length);
  }, [actorsCounter, lastEditedActor]); //eslint-disable-line

  useEffect(() => {
    fetchUsers();
    setUsersCount(accounts.length);
  }, [usersCounter]); //eslint-disable-line

  const fetchMovies = async () => {
    await dispatch(getMovies());
  };

  const fetchActors = async () => {
    await dispatch(getAllActors());
  };

  const fetchUsers = async () => {
    await dispatch(getUsers());
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
  const showEditActor = (actor: any) => {
    setEditedActor(actor);
    setEditActorState(true);
  };

  const updateActor = async (actor: any) => {
    const saveActor = await dispatch(
      editActor({
        actorId: actor.actorId,
        firstName: actor.firstName,
        lastName: actor.lastName,
        gender: actor.gender,
        age: actor.age,
      })
    );
    setLastEditedActor(saveActor);
  };

  const showDeleteActor = async (actor: any) => {
    setDeleteActorState(true);
    setdeleteActor(actor);
  };

  const confirmDeleteActor = async () => {
    const actor: any = deleteActor;

    await dispatch(deleteCelebrity(actor.id));
    setDeleteActorState(false);
    setActorsCounter((prev) => prev - 1);
  };
  /* #endregion */

  /* #region  - //TODO USER CONTROLS */
  const showEditUser = (file: any) => {
    setEditedUser(file);
    setEditUserState(true);
  };

  const updateUser = async (file: any) => {
    // const savedFile = await dispatch(
    //   // editUser({
    //   //   movieId: file.movieId,
    //   //   imgUrl: file.imgUrl,
    //   //   cost: file.cost,
    //   // })
    // );
    // setLastEditedUser(savedFile);
  };

  const showDeleteUser = async (User: any) => {
    setDeleteUserState(true);
    setdeleteUser(User);
  };

  const confirmDeleteUser = async () => {
    const movieId = deleteUser;

    await dispatch(deleteMovie(movieId));
    setDeleteUserState(false);
    setUsersCounter((prev) => prev - 1);
  };

  const showApprovedUser = async (userId: string) => {
    const approved = true;
    //TODO use confirm modal
    await dispatch(approveUser({ userId, approved }));
    setUsersCounter((prev) => prev + 1);
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
          <td></td>
          <td></td>
        </tr>
      ));
    }
  };

  const renderEmptyRowUser = (count: number) => {
    const emptyRows = 6;
    if (emptyRows - count > 0) {
      return [...Array(emptyRows - count)].map((rows, i) => (
        <tr key={i}>
          <td></td>
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
            header={["FIRST NAME", "LAST NAME", "GENDER", "AGE"]}
            keys={["firstName", "lastName", "gender", "age"]}
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
            actor={editedActor}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>USERS</h3>
          <Table
            header={["EMAIL", "APPROVED", "PERMISSIONS"]}
            keys={["email", "approved", "permissions"]}
            functionKey="id"
            data={accounts}
            onEdit={showEditUser}
            onDelete={showDeleteUser}
            onApproval={showApprovedUser}
            customRender={renderEmptyRowUser(usersCount)}
          />
        </Col>
      </Row>

      <div>
        <h5 className="todo">
          TODO: REVIEWS IS TEMPORARILY APPROVED. NEEDS ADMIN TO APPROVE
        </h5>
        <h5 className="todo">TODO: Actor page with movies</h5>
        <h5 className="todo">
          TODO: USERS EDIT/DELETE ALSO EDIT REVIEW COLLECTION(NAME)
        </h5>
        <h5 className="todo"> TODO: ACTORS DELETE DISABLE</h5>

        <p>minor</p>
        <h5> EMAIL TO Altamash.Kazi@cognixia.com</h5>
        <h5 className="todo"> TODO: ALERTS SHOULD BE INTEGRATED TO THE PAGE</h5>
        <h5 className="todo">TODO: OVERALL RATING</h5>
        <h5> Seperate slices</h5>
      </div>
    </div>
  );
}
