import { useEffect } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(
  callback: any,
  delay: number,
  dependencies: number[] | string[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, []);
}
