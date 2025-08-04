import type { Models } from "appwrite";

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IContextType = {
  user: IUser,
  isLoading: boolean,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  isAuthentificated: boolean,
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>,
  checkAuthUser: () => Promise<boolean>
}

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageURL: string;
  bio: string;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type INewPost = {
  userId: string,
  caption: string,
  file: File[];
  location?: string;
  tags?: string;
}

export type PostFormProps = {
  post?: Models.Document & {
    caption?: string;
    imageURL?: string;
    location?: string;
    tags?: string[];
  };
  action: "Create" | "Update";
};

