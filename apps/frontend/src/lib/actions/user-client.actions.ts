"use client";

import { SignInDto } from "../dto/user.dto";
import { apiFetch } from "../utils";

export const login = async (user: SignInDto) => {
  try {
    const data = await apiFetch<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      credentials: "include",
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw error;
  }
};
