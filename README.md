# GitHub Repository Search App

This is a small full-stack project I built as part of a technical assignment.  
The app allows users to search for GitHub repositories, view them in a gallery layout, and bookmark their favorites.

## Technologies Used

**Frontend (Angular 18):**
- Angular Standalone Components
- Angular Material
- Angular Router
- JWT Interceptor
- Pagination
- SCSS Styling

**Backend (.NET 8 Web API):**
- JWT Authentication
- In-Memory User Validation
- GitHub API Proxy
- Session-based bookmark storage
- CORS Configuration for Angular dev server

---

## Features

###  Login
- Simple login form with 2 mock users (`admin` and `user`)
- Password is hardcoded as `1234` for simplicity
- On login, a JWT token is issued from the backend and stored on the client side

###  GitHub Search
- After login, user can search for any repository using the GitHub API
- Each result shows:
  - Repo name
  - Owner avatar
  - Short description
  - Bookmark button

###  Bookmarks
- Clicking the bookmark button saves the repo to session (server-side)
- Bookmarked repos are fetched per user (by username from JWT token)
- There’s a separate page that shows only the user’s bookmarked repos

### JWT & Interceptors
- All authorized routes are protected by JWT
- Angular uses an `HttpInterceptor` to send the token automatically
- Only authenticated users can access `/search` and `/bookmarks`

---

## How to Run

### Backend (.NET 8)

1. Open the solution in Visual Studio
2. Make sure the `GithubRepoSearch.Api` project is the startup project
3. Run the app (will run on `https://localhost:7231` by default)

Make sure to have:
- ASP.NET Core Hosting Bundle installed (if running outside VS)
- HTTPS certificate trusted (for localhost)

### Frontend (Angular)

1. Go to the `githubRepoSearch.Client` folder  
2. Run `npm install`  
3. Run `ng serve`  
4. Open `http://localhost:4200`

---

## Notes

- There is no DB – everything is in-memory or session-based to keep things simple.
- Since bookmarks are saved per session, they reset after server restarts.
- I'm using standalone components only (no modules), since Angular 18 supports it well.
- Styling is done with Angular Material and some custom SCSS.

---

## Credentials for Testing

Username | Password 
---------|----------
admin    | 1234     
user     | 1234     

---

Thanks for checking out the project!
