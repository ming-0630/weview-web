interface User {
    id: string;
    email: string;
    username: string;
    roles: { id: number, name: string }[]
}

export default User