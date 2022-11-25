export type UserItem = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
};

export interface UserSliceState {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Geo = {
  lat: string;
  lng: string;
};
