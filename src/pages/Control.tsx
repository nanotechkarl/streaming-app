import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { deleteMovie, getAllActors, getMovies } from "../store/movie.slice";
import Table from "../components/table/Table";
import { Col, Row } from "react-bootstrap";
import DeleteModal from "../components/modal/DeleteModal";

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
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteFile, setdeleteFile] = useState("");

  /* #endregion */

  //#region - FETCH
  useEffect(() => {
    fetchMovies();
    setMoviesCount(movies.length);
  }, [moviesCounter]); //eslint-disable-line

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

  const showEdit = () => {};
  const showDelete = async (file: any) => {
    setDeleteModalState(true);
    setdeleteFile(file);
  };
  const confirmDelete = async () => {
    const movieId = deleteFile;

    await dispatch(deleteMovie(movieId));
    setDeleteModalState(false);
    setMoviesCounter((prev) => prev - 1);
  };

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
            header={["TITLE", "YEAR RELEASE"]}
            keys={["title", "yearRelease"]}
            functionKey="id"
            data={movies}
            onEdit={showEdit}
            onDelete={showDelete}
            customRender={renderEmptyRowMovie(moviesCount)}
            custom={{ disableDelete: { date: new Date() } }}
          />
          <AddMovie add={(x: any) => setMoviesCounter(x)} />
        </Col>
        <Col>
          <h3> ACTORS </h3>
          <Table
            header={["FIRST NAME", "LAST NAME"]}
            keys={["firstName", "lastName"]}
            functionKey="id"
            data={actors}
            onEdit={showEdit}
            onDelete={showDelete}
            customRender={renderEmptyRowActor(actorsCount)}
          />
          <AddActor add={(x: any) => setActorsCounter(x)} />
          <DeleteModal
            onHide={() => setDeleteModalState(false)}
            handleDelete={confirmDelete}
            show={deleteModalState}
          />
        </Col>
      </Row>
    </div>
  );
}
