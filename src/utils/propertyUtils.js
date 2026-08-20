import { properties } from "../data/homeConstant"

export const getPropertyById = (id) => {
    return properties.find((property) => property.id === Number(id))
}