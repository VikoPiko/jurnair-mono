"use server";

import { SignUpDto, UserDto } from "../dto/user.dto";
import { apiFetch, EventType, logger } from "../utils";

export const signUp = async (user: SignUpDto): Promise<UserDto> => {
  try {
    if (user.password !== user.confirmPassword) {
      throw new Error("Password or email is wrong");
    }
    const { confirmPassword, ...payload } = user;
    logger("SignUp", EventType.received, payload);
    const data = await apiFetch<UserDto>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
    throw error;
  }
};

export const logout = async () => {};
