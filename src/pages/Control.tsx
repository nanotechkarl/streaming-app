import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { deleteMovie, editMovie, getMovies } from "../store/movie.slice";
import { approvePendingReview, getPendingReviews } from "../store/review.slice";
import { deleteCelebrity, editActor, getAllActors } from "../store/actor.slice";
import Table from "../components/table/Table";
import { Col, Row } from "react-bootstrap";
import DeleteModal from "../components/modal/DeleteModal";
import EditMovie from "../components/modal/EditMovie";
import EditActor from "../components/modal/EditActor";
import { approveUser, getUsers } from "../store/user.slice";
import Swal from "sweetalert2";
import { Users } from "../store/types";
import { ActorInputs } from "../types/inputs";

export default function Control() {
  /* #region  - HOOKS */
  const dispatch = useAppDispatch();
  const { movies }: { [key: string]: any } = useAppSelector(
    //TODO USE TYPES FROM STORE
    (state) => state.movie
  );
  const { pendingReviews }: { [key: string]: any } = useAppSelector(
    (state) => state.review
  );
  const { actors }: { [key: string]: any } = useAppSelector(
    (state) => state.actor
  );
  const { accounts }: { accounts: Users[] } = useAppSelector(
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
  const [deleteFile, setdeleteFile] = useState({}) as any;
  const [deleteActor, setdeleteActor] = useState("");
  const [deleteUser, setdeleteUser] = useState("");
  const [editMovieState, setEditMovieState] = useState(false);
  const [editActorState, setEditActorState] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [editedFile, setEditedFile] = useState({}) as any;
  const [editedActor, setEditedActor] = useState({}) as any;
  const [editedUser, setEditedUser] = useState("");
  const [lastEditedFile, setLastEditedFile] = useState({});
  const [lastEditedActor, setLastEditedActor] = useState({});
  const [lastEditedUser, setLastEditedUser] = useState({});

  const [reviewCounter, setReviewCounter] = useState(0);

  /* #endregion */

  //#region - DYNAMIC FETCH
  useEffect(() => {
    fetchMovies();
    setMoviesCount(movies.length);
  }, [moviesCounter, lastEditedFile]); //eslint-disable-line

  useEffect(() => {
    fetchActors();
    setActorsCount(actors.length);
  }, [actorsCounter, lastEditedActor, deleteMovieState]); //eslint-disable-line

  useEffect(() => {
    fetchUsers();
    setUsersCount(accounts.length);
  }, [usersCounter]); //eslint-disable-line

  useEffect(() => {
    fetchPendingReviews();
  }, [reviewCounter]); //eslint-disable-line

  const fetchMovies = async () => {
    await dispatch(getMovies());
  };

  const fetchActors = async () => {
    await dispatch(getAllActors());
  };

  const fetchUsers = async () => {
    await dispatch(getUsers());
  };

  const fetchPendingReviews = async () => {
    await dispatch(getPendingReviews());
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
    const movieId = deleteFile?.id;

    await dispatch(deleteMovie(movieId));
    setDeleteMovieState(false);
    setMoviesCounter((prev) => prev - 1);
  };
  /* #endregion */

  /* #region  - //TODO ACTOR CONTROLS - disable delete */
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
    alertApproveUser(userId);
  };

  const alertApproveUser = async (userId: string) => {
    Swal.fire({
      title: `Approve user?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
      customClass: "swal-confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const approved = true;
        dispatch(approveUser({ userId, approved }));
        setUsersCounter((prev) => prev + 1);
      }
    });
  };

  /* #endregion */

  /* #region  - REVIEW CONTROLS */
  const approveReview = async (reviewId: string) => {
    alertApprove(reviewId);
  };

  const alertApprove = async (reviewId: string) => {
    Swal.fire({
      title: `Approve review?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
      customClass: "swal-confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(approvePendingReview(reviewId));
        setReviewCounter((prev) => prev + 1);
        Swal.fire(`review is approved`);
      }
    });
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
            custom={{ disableDelete: { movie: true } }}
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
        <h3>PENDING REVIEWS</h3>
        <Table
          header={["Name", "User", "Movie", "Rating", "Message", "Approval"]}
          keys={["name", "userId", "movieId", "rating", "message", "approved"]}
          functionKey="id"
          data={pendingReviews}
          onApproval={approveReview}
        />
      </Row>

      <div>
        <h5> TODO: reset state of inputs after close modal</h5>

        <p>minor</p>
        <h5 className="todo">
          TODO: USERS EDIT/DELETE ALSO EDIT REVIEW COLLECTION(NAME)
        </h5>
        <h5> EMAIL TO Altamash.Kazi@cognixia.com</h5>
        <h5 className="todo">TODO: OVERALL RATING</h5>
        <h5 className="todo"> TODO: Remove actor from movie</h5>
      </div>
    </div>
  );
}
