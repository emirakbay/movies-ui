import { IDQueryResponse } from "@/app/types/types";
import axios from "axios";

export default async function Page({ params }: { params: { imdbID: string } }) {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL2 + params.imdbID
  );
  const movieData: IDQueryResponse = res.data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <section className="flex flex-col gap-1 mx-auto">
        <h1 className="text-2xl font-bold">{movieData.Title}</h1>
        <img src={movieData.Poster} alt={movieData.Title} width={256} />
        <section className="flex flex-col gap-2 mx-auto w-fit">
          <p className="max-w-xl mx-auto">
            <span className="font-bold">Plot: </span>
            {movieData.Plot}
          </p>
          <p>
            <span className="font-bold">Released: </span>
            {movieData.Released}
          </p>
          <p>
            <span className="font-bold">Runtime: </span>
            {movieData.Runtime}
          </p>
          <p>
            <span className="font-bold">Director: </span>
            {movieData.Director}
          </p>
          <p>
            <span className="font-bold">Writer: </span>
            {movieData.Writer}
          </p>
          <p>
            <span className="font-bold">Actors: </span>
            {movieData.Actors}
          </p>
          <p>
            <span className="font-bold">Genre: </span>
            {movieData.Genre}
          </p>
          <p>
            <span className="font-bold">Language: </span>
            {movieData.Language}
          </p>
          <p>
            <span className="font-bold">Country: </span>
            {movieData.Country}
          </p>
          <p>
            <span className="font-bold">Awards: </span>
            {movieData.Awards}
          </p>
          <p>
            <span className="font-bold">Metascore: </span>
            {movieData.Metascore}
          </p>
          <p>
            <span className="font-bold">IMDb Votes</span>: {movieData.imdbVotes}
          </p>
          <p>
            <span className="font-bold">Type: </span>
            {movieData.Type}
          </p>
        </section>
      </section>
    </main>
  );
}
