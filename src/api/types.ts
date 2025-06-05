// Internal types used for basic data manipulation, response types will be separate

export type Employee = {
    userId: number,
    lineId: string,
    name: string,
    verified: boolean,
    teamId?: number
}

export type Team = {
    teamId: number,
    name: string
}

export type Car = {
    carId: number,
    plateNumber: string,
    teamId: number
}

export type Admin = {
    adminId: number,
    name: string
}

export type Reservation = {
    reservationId: number,
    userId: number,
    carId: number,
    checkinTime: string, // i am NOT gonna keep this as a Date
    checkoutTime?: string // screw you
}