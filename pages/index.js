import Header from '../components/Header'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div>
      <Header />

      <Link href='/homeCanvas' sx={{ m: 10 }}>Vista del Lienzo</Link>
      <Link href='/homeArtist'>Vista del Artista</Link>



    </div>
  );

}
