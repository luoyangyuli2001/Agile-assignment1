import React from "react";
import { getPopularPeople } from "../api/tmdb-api";
import PageTemplate from '../components/templatePersonListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const PopularPeoplePage = (props) => {

  const { data, error, isLoading, isError }  = useQuery('person', getPopularPeople)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const people = data.results;

  return (
    <PageTemplate 
      people={people}
    />
  );
};

export default PopularPeoplePage;