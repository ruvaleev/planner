function AreasReducerGenerator({
  isAuthenticated = false, isDemo = false, isLoading = false, isError = false, error = null,
}) {
  return {
    isAuthenticated, isDemo, isLoading, isError, error,
  };
}

export default AreasReducerGenerator;
