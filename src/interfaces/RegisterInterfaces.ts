export interface RegisterData {
    name: string;
    email: string;
    password: string;
}
  
export interface RegisterResponse {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
  