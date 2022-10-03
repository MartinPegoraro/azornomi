import Header from '../components/Header'
import Link from '@mui/material/Link';
import useStatesHome from '../hook/useStatesHome';
import Login from '../components/Login';

export default function Home() {
  const [state, handleClick] = useStatesHome('')
  return (
    <div>
      <Header />
      <Login />
    </div>
  );

}
