// "use client";

// import { login } from "@/lib/actions/user-client.actions";
// import { signUp } from "@/lib/actions/user.actions";
// import { AuthContextType } from "@/lib/dto/auth.dto";
// import { SignInDto, SignUpDto, UserDto } from "@/lib/dto/user.dto";
// import { apiFetch } from "@/lib/utils";
// import { createContext, ReactNode, useContext } from "react";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const queryClient = useQueryClient();

//   // Fetch the current user
//   const {
//     data: user,
//     isLoading,
//     refetch: refetchUser,
//   } = useQuery<UserDto | null>(
//     ["auth", "me"],
//     async () => {
//       try {
//         return await apiFetch<UserDto>("/user/me", { credentials: "include" });
//       } catch {
//         return null;
//       }
//     }
//   );

//   // Login mutation
//   const loginMutation = useMutation({
//     mutationFn: (data: SignInDto) => login(data),
//     onSuccess: async () => {
//       await refetchUser(); // update cached user
//     },
//   });

//   // Register mutation
//   const registerMutation = useMutation({
//     mutationFn: (data: SignUpDto) => signUp(data),
//     onSuccess: async () => {
//       await refetchUser();
//     },
//   });

//   // Logout
//   const signOut = async () => {
//     await apiFetch("/auth/logout", { method: "POST", credentials: "include" });
//     queryClient.setQueryData(["auth", "me"], null); // clear cached user
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user: user ?? null,
//         isAuthenticated: !!user,
//         isLoading,
//         signIn: loginMutation.mutateAsync,
//         signUp: registerMutation.mutateAsync,
//         signOut,
//         refetchUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }
