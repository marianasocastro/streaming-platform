export interface Serie{
  id: number,
  media_type?: string,
  title: string,
  genre_ids: number[],
  genres: string[],
  backdrop_path: string,
  poster_path: string,
  overview: string,
  release_date: string,
  vote_average: number
}
