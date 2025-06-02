import { type Employee, type Team, type Car, type Admin, type Reservation } from "./types";

export const employees: Employee[] = [
    { userId: 1, lineId: "line123", name: "Alice", verified: true, teamId: 1 },
    { userId: 2, lineId: "line456", name: "Bob", verified: false }
];

export const teams: Team[] = [
    { teamId: 1, name: "Engineering" },
    { teamId: 2, name: "Design" }
];

export const cars: Car[] = [
    { carId: 101, plateNumber: "ABC-123" },
    { carId: 102, plateNumber: "XYZ-789" }
];

export const admins: Admin[] = [
    { adminId: 1, name: "admin1", password: "hashedpassword1" },
    { adminId: 2, name: "admin2", password: "hashedpassword2" }
];

export const reservations: Reservation[] = [
    { reservationId: 1, userId: 1, carId: 101, checkinTime: "2025-06-02T10:00:00Z", checkoutTime: "2025-06-02T12:00:00Z" },
    { reservationId: 2, userId: 2, carId: 102, checkinTime: "2025-06-02T14:00:00Z", checkoutTime: "2025-06-02T16:00:00Z" }
];

export const listReservations = (pageNumber: number = 1, numRows: number = 10) => {
    const startIndex = (pageNumber - 1) * numRows;
    const endIndex = startIndex + numRows;
    const pagedReservations = reservations.slice(startIndex, endIndex);
    return {
        data: pagedReservations,
        total: reservations.length,
        page: pageNumber,
        maxPages: Math.ceil(reservations.length / numRows),
        pageSize: numRows
    };
}

export const listCars = (pageNumber: number = 1, numRows: number = 10) => {
    const startIndex = (pageNumber - 1) * numRows;
    const endIndex = startIndex + numRows;
    const pagedCars = cars.slice(startIndex, endIndex);
    return {
        data: pagedCars,
        total: cars.length,
        page: pageNumber,
        maxPages: Math.ceil(cars.length / numRows),
        pageSize: numRows
    };
}

export const listEmployees = (pageNumber: number = 1, numRows: number = 10) => {
    const startIndex = (pageNumber - 1) * numRows;
    const endIndex = startIndex + numRows;
    const pagedCars = employees.slice(startIndex, endIndex);
    return {
        data: pagedCars,
        total: employees.length,
        page: pageNumber,
        maxPages: Math.ceil(employees.length / numRows),
        pageSize: numRows
    };
}

export const listTeams = (pageNumber: number = 1, numRows: number = 10) => {
    const startIndex = (pageNumber - 1) * numRows;
    const endIndex = startIndex + numRows;
    const pagedCars = teams.slice(startIndex, endIndex);
    return {
        data: pagedCars,
        total: teams.length,
        page: pageNumber,
        maxPages: Math.ceil(teams.length / numRows),
        pageSize: numRows
    };
}