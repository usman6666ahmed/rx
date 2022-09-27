import { Post } from './types';


export const createPostElement = (post: Post):HTMLDivElement => {

  const el = document.createElement('div');
  el.className = 'post';
  el.innerHTML = `
  <h3>${post.title}</h3>
  <p>${post.body}</p>
  `;
  return el;

}


export const appendPostElement = (post: HTMLElement):void => {
  document.querySelector('#app')?.appendChild(post);
}

export const updateCount = () => {
  const count = document.querySelector("h1") as HTMLHeadingElement;
   count.innerText = String(document.querySelectorAll(".post").length || 0);
}
