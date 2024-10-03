import useSelector from "./use-selector";
import useStore from "./use-store";

export default function useAuth() {
  const store = useStore()
  store.auth.requireToken()
}