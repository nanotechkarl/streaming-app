import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useTypedSelector";
import { getAllActors, getMovies } from "../store/movie.slice";

export default function Control() {
  //#region - FETCH
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getMovies());
    await dispatch(getAllActors());
  };

  //#endregion

  return (
    <div className="control-page">
      <div>
        <h3>MOVIES</h3>
        <AddMovie />
      </div>
      <div>
        <h3> ACTORS </h3>
        <AddActor />
      </div>
    </div>
  );
}
