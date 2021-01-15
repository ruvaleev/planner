function AreasReducerGenerator({
  authToken = null, isAuthenticated = false, isLoading = false, isError = false, error = null,
}) {
  return {
    authToken, isAuthenticated, isLoading, isError, error,
  };
}

export default AreasReducerGenerator;
