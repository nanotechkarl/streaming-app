import AddMovie from "../components/modal/AddMovie";
import AddActor from "../components/modal/AddActor";

export default function Control() {
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
