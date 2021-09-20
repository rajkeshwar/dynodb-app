import { useEffect, useState } from "react";
import { Badge, Spinner, Table } from "react-bootstrap";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const colors = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info'
];

const MoviesTable = () => {
  const [movies, setMovies] = useState();


  useEffect(() => {
    fetch('data/moviedata.json')
      .then(resp => resp.json())
      .then(resp => setMovies(resp))
  }, [])

  if (!movies) {
    return (
      <div className="spinner-cont">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, idx) => (
          <tr key={idx}>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{new Date(movie.info.release_date).toDateString()}</td>
            <td>
              {movie.info.genres.map((genre, id) => (
                <div className="d-inline mr-2" key={id}>
                <Badge bg={colors[id]} >{genre}</Badge>
                </div>
              ))}
              
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
  );
}

export default MoviesTable;