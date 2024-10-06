import { useNavigate } from "react-router-dom";
import useSelector from "./use-selector";

export default function useAuth() {
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate()
  if (!token) navigate('/login')

  return token
}