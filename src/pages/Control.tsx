import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { deleteMovie, editMovie, getMovies } from "../store/movie.slice";
import { approvePendingReview, getPendingReviews } from "../store/review.slice";
import { deleteCelebrity, editActor, getAllActors } from "../store/actor.slice";
import {
  approveUser,
  deleteUserById,
  editUser,
  getUsers,
} from "../store/user.slice";
import Table from "../components/table/Table";
import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import DeleteModal from "../components/modal/DeleteModal";
import EditMovie from "../components/modal/EditMovie";
import EditActor from "../components/modal/EditActor";
import Swal from "sweetalert2";
import { Users } from "../store/types";
import EditUser from "../components/modal/EditUser";

export default function Control() {
  /* #region  - HOOKS */
  const dispatch = useAppDispatch();
  const { movies }: { [key: string]: any } = useAppSelector(
    (state) => state.movie
  );
  const { pendingReviews }: { [key: string]: any } = useAppSelector(
    (state) => state.review
  );
  const { actors }: { [key: string]: any } = useAppSelector(
    (state) => state.actor
  );
  const { accounts, current }: { accounts: Users[]; current: any } =
    useAppSelector((state) => state.user);
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
  const [editedUser, setEditedUser] = useState({}) as any;
  const [lastEditedFile, setLastEditedFile] = useState({});
  const [lastEditedActor, setLastEditedActor] = useState({});
  const [lastEditedUser, setLastEditedUser] = useState({});

  const [reviewCounter, setReviewCounter] = useState(0);

  /* #endregion */

  //#region - EFFECT
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
  }, [usersCounter, lastEditedUser]); //eslint-disable-line

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

  /* #region  - ACTOR CONTROLS - */
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

  /* #region  - USER CONTROLS */
  const showEditUser = (user: any) => {
    setEditedUser(user);
    setEditUserState(true);
  };

  const updateUser = async (user: any) => {
    const savedUser = await dispatch(
      editUser({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        permissions: user.permissions,
      })
    );
    setLastEditedUser(savedUser);
  };

  const showDeleteUser = async (user: any) => {
    confirmDeleteUser(user);
  };

  const confirmDeleteUser = async (user: any) => {
    Swal.fire({
      title: `Delete user?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      customClass: "swal-confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteUserById(user.id));
        setDeleteUserState(false);
        setUsersCounter((prev) => prev - 1);
      }
    });
  };

  const showApprovedUser = async (userId: string) => {
    alertApproveUser(userId);
  };

  const alertApproveUser = async (user: any) => {
    Swal.fire({
      title: `Approve user?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
      customClass: "swal-confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const approved = true;
        await dispatch(approveUser({ userId: user.id, approved }));
        setUsersCounter((prev) => prev + 1);
        Swal.fire({
          icon: "success",
          title: `User is approved`,
          showConfirmButton: false,
          timer: 1500,
        });
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
        Swal.fire({
          icon: "success",
          title: `review is approved`,
          showConfirmButton: false,
          timer: 1500,
        });
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
            header={["TITLE", "YEAR RELEASE", "COST"]}
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
          header={[
            "EMAIL",
            "FIRST NAME",
            "LAST NAME",
            "APPROVED",
            "PERMISSIONS",
          ]}
          keys={["email", "firstName", "lastName", "approved", "permissions"]}
          data={accounts}
          onApproval={showApprovedUser}
          onDelete={showDeleteUser}
          onEdit={showEditUser}
          customRender={renderEmptyRowUser(usersCount)}
          custom={{ disableDelete: { root: true, user: current } }}
        />
        <EditUser
          onHide={() => setEditUserState(false)}
          onEdit={updateUser}
          show={editUserState}
          user={editedUser}
        />
        <h3>PENDING REVIEWS</h3>
        <Table
          header={["Name", "User", "Movie", "Rating", "Message", "Approval"]}
          keys={["name", "userId", "movieId", "rating", "message", "approved"]}
          functionKey="id"
          data={pendingReviews}
          onApproval={approveReview}
          custom={{ display: "large" }}
        />
      </Row>
    </div>
  );
}
