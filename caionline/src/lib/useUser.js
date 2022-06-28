import { useEffect } from 'react'
import Router from 'next/router'
import { useQuery } from 'react-query'


export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const {
    isLoading,
    isFetching,
    isError,
    data,
  } = useQuery(['/api/user'], async ({ queryKey }) => {
    let res = await fetch(queryKey)
    let data = await res.json()
    return data
  })  
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    console.log('useEffect', data);
    if (!redirectTo && !data) {
      Router.push(redirectTo);
      return;
    }

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo])

  console.log('api/user', data);
  return { data }
}
