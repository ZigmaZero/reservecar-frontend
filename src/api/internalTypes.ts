// Internal types used for basic data manipulation, response types will be separate

export type Employee = {
    id?: number,
    lineId: string,
    name: string,
    verified: boolean,
    teamId?: number
}

export type Team = {
    id?: number,
    name: string
}

export type Car = {
    id?: number,
    plateNumber: string,
    teamId?: number
}

export type Admin = {
    id?: number,
    name: string
}

export type Reservation = {
    id?: number,
    userId: number,
    carId: number,
    description: string,
    checkinTime: string, // stored as ISO string
    checkoutTime?: string
}