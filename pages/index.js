import Header from '../components/Header'
import Link from '@mui/material/Link';
import useStatesHome from '../hook/useStatesHome';

export default function Home() {
  const [state, handleClick] = useStatesHome('')
  return (
    <div>
      <Header />
      <Link href='/homeCanvas' onClick={() => handleClick('lienzo')} sx={{ m: 10 }}>Vista del Lienzo</Link>
      <Link href='/homeArtist' onClick={() => handleClick('artista')}>Vista del Artista</Link>
    </div>
  );

}
