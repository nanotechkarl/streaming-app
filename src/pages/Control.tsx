import { useAppDispatch } from "../hooks/useTypedSelector";

export default function Control() {
  /* #region - Hooks */
  const dispatch = useAppDispatch();
  /* #endregion */

  return <div>CONTROL</div>;
}
