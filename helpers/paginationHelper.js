const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 20);
    const skip = (page - 1) * limit;
  
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
  
    return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    };
  };


   const paginationHelpers = {
    calculatePagination,
  };

  module.exports = paginationHelpers