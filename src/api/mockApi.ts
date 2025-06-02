export interface MockDataResponse {
  items: { id: number; name: string }[];
  totalPages: number;
}

export const fetchJobs = async (page: number): Promise<MockDataResponse> => {
  return fetchData([{ id: 1, name: "Software Engineer" }, { id: 2, name: "Data Analyst" }], page);
};

export const fetchCars = async (page: number): Promise<MockDataResponse> => {
  return fetchData([{ id: 1, name: "Tesla Model S" }, { id: 2, name: "BMW X5" }], page);
};

export const fetchEmployees = async (page: number): Promise<MockDataResponse> => {
  return fetchData([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }], page);
};

export const fetchTeams = async (page: number): Promise<MockDataResponse> => {
  return fetchData([{ id: 1, name: "Marketing" }, { id: 2, name: "Development" }], page);
};

const fetchData = async (dataset: { id: number; name: string }[], page: number): Promise<MockDataResponse> => {
  const itemsPerPage = 2;
  const totalPages = Math.ceil(dataset.length / itemsPerPage);
  const paginatedItems = dataset.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ items: paginatedItems, totalPages });
    }, 500); // Simulating network delay
  });
};
