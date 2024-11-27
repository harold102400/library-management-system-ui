export type UserPropType = {
    id: string;
    inputValue: string;
    password: string;
    createdAt: string;
}

export type InputValueProp = Pick<UserPropType, "password"> & {
    username: string; 
    email: string;
}