import React, { lazy, Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import HomePage from "./pages/homePage";
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const TopRatedMoviesPage = lazy(() => import("./pages/topRatedMoviesPage"));
const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'));
const PopularPeoplePage = lazy(() => import('./pages/popularPeoplePage'));
const PersonPage = lazy(() => import('./pages/personDetialsPage'));
const ResetPage = lazy(() => import("./pages/resetPage"));
const RegisterPage = lazy(() => import("./pages/registerPage"));
const LoginPage = lazy(() => import("./pages/loginPage"));
const LogoutPage = lazy(() => import("./pages/logoutPage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Suspense fallback={<h1>Loading page</h1>}>
        <Routes>
          <Route path="/logout" element={ <LogoutPage />}/>
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/register" element={ <RegisterPage />} />
          <Route path="/reset" element={ <ResetPage />} />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/person/popular" element={<PopularPeoplePage />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
        </Suspense>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);