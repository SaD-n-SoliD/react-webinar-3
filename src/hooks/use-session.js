import useSelector from './use-selector';

export default function useSession() {
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));
  return select
}