import { marvelApiKey, marvelHash } from '../utils/md5hash';

async function Comics() {
  const comics = await getComics();
  return (
    <div>
      <h1>Marvel Comics</h1>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            {comic.title} - {comic.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getComics() {
  // Your Marvel API parameters
  const ts = 1;
  const apikey = marvelApiKey;
  const hash = marvelHash; // Typically md5(ts+privateKey+publicKey)


  const response = await fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey}&hash=${hash}`,
    { cache: 'no-store'}
  );
  const data = await response.json();
  // console.log(`data: ${data}`);
  const comics = data.data.results;

  return comics
}


export default Comics