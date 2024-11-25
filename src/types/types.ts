export interface AuthState {
    token: string | null;
    isLoading: boolean,
    isError : boolean,
    isAuthenticated: boolean;
    errorMsg: string
}


export interface UserState {
    id: number; 
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    profile_image?: string;
    is_active?: boolean;
}

export interface DataState {
    isLoading: boolean,
    isError?: boolean,
    users: UserState[],
    errorMsg?: string,
    singleUser: UserState[]
}


export interface VendorProps {
    id: number,
    name: string,
    email: string,
    phone_number?: string,
    country?: string,
    status?: string,
    personnel_name: string
    type?: string
    is_active?: boolean
}

export interface VendorState {
    isLoading: boolean,
    isError?: boolean,
    vendors: VendorProps[],
    singleVendor: VendorProps[]
    errorMsg?: string,
}


export interface ContributorProps {
    id: number,
    country?: string,
    status?: string,
    personnel_name: string
    type?: string
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    profile_image?: string;
    is_active?: boolean;
}

export interface ContributorState {
    isLoading: boolean,
    isError?: boolean,
    contributors: ContributorProps[],
    singleContributor: ContributorProps[]
    errorMsg?: string,
}