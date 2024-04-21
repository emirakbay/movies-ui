import MoviesTable from "./components/movies-table";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-5">
      <p className="font-bold text-lg">Welcome to the Movies UI!</p>
      <MoviesTable />
    </main>
  );
}
