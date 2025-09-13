export class UserDTO {
    static getUserTokenFrom(user: { first_name: string; last_name: string; role: string; email: string }): {
        name: string;
        role: string;
        email: string;
    } {
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email,
        };
    }
}