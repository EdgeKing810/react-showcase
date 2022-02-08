# ToDO / Test

## Screens + Features

### 0. Routing [1/2]

Packages:

- axios
- react-router-dom
- react-alert
- react-alert-template-basic

* Login Wrapper: Fetch a message from Kinesis API
* Custom routing system
* Pick between different pages (use `history.push()`)
* A custom page which displays data from `useParams`

### 1. Paginated Posts Fetcher (PPF) [0/2]

Packages:

- axios
- react-paginate

* Use `useState` + `useEffect` + `useContext` hooks
* Pagination wrapper to fetch X by X amount of data
* Add to a state found in the `LocalContext`
* Buttons at bottom of screen to alternate between different pages
* Hover animations

### 2. Custom language + light/dark mode toggle [0/2]

Packages:

- particles-bg
- react-alert
- react-alert-template-basic
- react-lazyload

* Some placeholder data
* Light/Dark switch with animations/transitions
* Build custom useLanguage hook
* Ability to choose between different languages for the data

### 3. Todolist maker + viewer [0/2]

Packages:

- zustand
- uuid

* Add / edit / delete todos
* Popup display when edit
* Popup display when delete (confirmation)
* Associated functions in `zustand` store

### 4. Markdown Editor + Preview [0/2]

Packages:

- @uiw/react-md-editor
- react-markdown
- react-syntax-highlighter
- remark-gfm

* Markdown editor + preview
* Upload images
* processors/markdownEngine
