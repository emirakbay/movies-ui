"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import { TableMovieObject } from "../types/types";

export default function MoviesTable() {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  const inputRef = React.createRef<HTMLInputElement>();

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const moviesPerPage = 10;

  const fetchMovies = async () => {
    setLoading(true);
    const response = await axios.get(
      `${API_URL}s=${searchTerm}&y=${yearFilter}&type=${typeFilter}&page=${currentPage}`
    );
    if (response.data.Response === "True") {
      setMovies(response.data.Search || []);
      setTotalResults(parseInt(response.data.totalResults));
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, yearFilter, typeFilter, currentPage]);

  const totalPages = Math.ceil(totalResults / moviesPerPage);
  const handleClick = (type: any) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (type === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setTotalResults(0);
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      {loaded ? (
        <>
          <main className="flex flex-col gap-2">
            <section className="pt-2 flex flex-row gap-5 w-max mx-auto">
              <div className="flex flex-row gap-1 items-center">
                <h1 className="font-bold">Title: </h1>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-white border rounded-md px-2 py-1"
                />
              </div>
              <div className="flex flex-row gap-1 items-center">
                <h1 className="font-bold">Years: </h1>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option disabled value="">
                    All Years
                  </option>
                  {movies
                    .map((movie: TableMovieObject) => movie.Year)
                    .filter((year, index, self) => self.indexOf(year) === index)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <h1 className="font-bold">Type: </h1>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">TV Series</option>
                  <option value="episode">TV Episodes</option>
                </select>
              </div>
            </section>
            <section>
              <table>
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Year</th>
                    <th className="border px-4 py-2">imdbID</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index}>
                          <td className="border px-64 py-2 text-center">
                            <Spinner />
                          </td>
                          <td className="border px-8 py-2 text-center">
                            <Spinner />
                          </td>
                          <td className="border px-8 py-2 text-center">
                            <Spinner />
                          </td>
                        </tr>
                      ))
                    : movies.map((movie: TableMovieObject) => (
                        <tr
                          key={movie.imdbID}
                          onClick={() => {
                            router.push(`/movie/${movie.imdbID}`);
                          }}
                          className="hover:bg-black cursor-pointer hover:text-white"
                        >
                          <td className="border px-4 py-2">{movie.Title}</td>
                          <td className="border px-4 py-2">{movie.Year}</td>
                          <td className="border px-4 py-2">{movie.imdbID}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </section>
            <section className="pt-4 flex flex-row gap-5 mx-auto w-fit">
              <button
                onClick={() => handleClick("prev")}
                disabled={currentPage === 1}
                className="bg-black text-white rounded-md px-2"
              >
                Prev
              </button>
              <button
                onClick={() => handleClick("next")}
                disabled={currentPage === totalPages}
                className="bg-black text-white rounded-md px-2"
              >
                Next
              </button>

              <select
                value={currentPage}
                onChange={handlePageChange}
                className="bg-white border rounded-md px-2 py-1"
              >
                {Array.from({ length: totalPages }).map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Page {index + 1}
                  </option>
                ))}
              </select>

              <span>
                Total Results:{" "}
                <span className="font-extrabold">{totalResults}</span>
              </span>
            </section>
          </main>
        </>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="inline-block animate-spin rounded-full h-64 w-64 border-t-2 border-b-2 border-gray-900" />
        </div>
      )}
    </>
  );
}
