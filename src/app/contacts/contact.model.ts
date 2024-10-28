

export interface Contact {
  id: string,
  icon: string,
  personal: boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phone: Phone,
  address: Address,
  notes: string,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypeValues = [
  {title: 'Mobile', Value: 'mobile'},
  {title: 'Work', Value: 'work'},
  {title: 'Other', Value: 'other'},
]

export const addreesTypeValues = [
  {title: 'Mobile', Value: 'mobile'},
  {title: 'Work', Value: 'work'},
  {title: 'Other', Value: 'other'},
]
