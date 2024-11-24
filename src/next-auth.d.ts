// next-auth.d.ts

export interface UserInfoProps {
  _id: string;
  email: string;
  jwt: string;
  isDeleted: boolean;
}

declare module "next-auth" {
  type User = UserInfoProps;

  interface Session {
    jwt: string;
    user: UserInfoProps;
  }
}

declare module "next-auth/jwt" {
  type JWT = UserInfoProps;
}
