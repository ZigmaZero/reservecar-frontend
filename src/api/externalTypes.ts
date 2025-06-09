// Internal types used for basic data manipulation, response types will be separate

export type EmployeeExternal = {
    id?: number,
    lineId: string,
    name: string,
    verified: boolean,
    teamName?: string
}

export type TeamExternal = {
    teamId?: number,
    name: string
}

export type CarExternal = {
    carId?: number,
    plateNumber: string,
    teamName?: string
}

export type AdminExternal = {
    id?: number,
    name: string
}

export type ReservationExternal = {
    id?: number,
    user: string,
    car: string,
    description: string,
    checkinTime: string, // i am NOT gonna keep this as a Date
    checkoutTime?: string // screw you
}