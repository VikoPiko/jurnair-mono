export type SignUpDto = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  avatarUrl?: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  role: "USER" | "HOST" | "ADMIN";
  favoriteListings?: { id: string }[];
  favoritePosts?: { id: string }[];
}
