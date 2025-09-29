import { SignInDto, SignUpDto, UserDto } from "./user.dto";

export interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: SignInDto) => Promise<void>;
  signUp: (user: SignUpDto) => Promise<void>;
  signOut: () => Promise<void>;
  refetchUser: () => Promise<void>;
}
