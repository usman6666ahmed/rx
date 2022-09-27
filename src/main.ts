import { Post } from "./types";
import { debounceTime, distinctUntilChanged, from, fromEvent, map, reduce } from "rxjs";
import axios from "axios";

const fetchData = async () => {
  const url = "http://jsonplaceholder.typicode.com/posts";
  return (await axios.get<Post[]>(url)).data;
};

const button = document.querySelector("button") as HTMLButtonElement;
const input = document.querySelector("#search") as HTMLInputElement;

const postsStream$ = from<Promise<Post[]>>(fetchData());
fromEvent(button, "click").subscribe(() => {
  postsStream$
    .pipe(map((posts: Post[]) => posts.slice(0, 5)))
    .subscribe((posts) => {
      console.log(posts.length);
    });
});

fromEvent(input, "input")
  .pipe(
    distinctUntilChanged(),
    debounceTime(500),
    map((event: Event) => (event.target as HTMLInputElement).value),
  )
  .subscribe((value: string) => {
    console.log(value);
  });
