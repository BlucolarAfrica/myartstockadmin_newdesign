
export interface AuthState {
    token: string | null;
    isLoading: boolean,
    isError : boolean,
    isAuthenticated?: boolean;
    errorMsg: string
}

export interface orderHistory {
    id: number;
    status?: string;
    delivery_fee: number;
    sku?: string;
    due_date: string;
    date_assigned: string;
    created_at: string
    customer?: {
        id: number,
        first_name?: string,
        last_name?: string,
        email?: string,
        phone_number?: string
    };
    items?: {
        id: number,
        category: string,
        type: string,
        quantity: string,
        status: string,
        purchase_price: string,
        purchase_discount: number;
        deliverable?: {
            title: string,
            slug: string,
            description?: string
        },  
        assigned_to?: {
            name?: string,
            business_name: string;
            personnel_name?: string,
            type?: string
        }
    };
    total_amount: number
};

export interface PersonalInformation {
    personal_information: {
        id: number; 
        first_name: string;
        last_name:string;
        email: string;
        phone_number: string;
        gender?: string;
        profile_image?: string;
        status?: boolean;
        referral_code: string;
        date_of_birth?: null;
        country: string;
        created_at: string;
        address?: string
    };
    orderHistory?: orderHistory[];
    total_orders?: number;
    total_amount_spent?: number;
}

export interface UserState {
        id: number; 
        first_name: string;
        last_name:string;
        email: string;
        phone_number: string;
        gender?: string;
        profile_image?: string;
        status?: boolean;
}

export interface DataState {
    isLoading: boolean,
    isError?: boolean,
    users: UserState[],
    errorMsg?: string,
    singleUser:  PersonalInformation| null
}

export interface withdrawal_history {
    id: number
    amount: number,
    status: string,
    created_at: string
}

export interface VendorProps {
    id: number,
    name: string,
    email: string,
    phone_number?: string,
    country?: string,
    status?: string,
    gender?: string,
    date_of_birth: string,
    created_at:string,
    personnel_name: string;
    profile_image: string;
    type?: string;
    state?: string;
    city?:string,
    is_active?: boolean;
    orders?: {
        total_content_download: number
        total_amount_spent: number
    };
    other_details?: {
        order_items: [],
        total_completed_order: number;
        total_processing_orders: number;
        total_pending_orders: number;
        wallet_ballance: string;
        witdrawals_history: withdrawal_history[];
        payments_history: []
    } 
}


export interface VendorState {
    isLoading: boolean,
    isError?: boolean,
    vendors: VendorProps[],
    singleVendor: VendorProps | null,
    errorMsg?: string,
}


export interface ContributorProps {
    id: number,
    country?: string,
    status?: string,
    personnel_name?: string
    type?: string
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    profile_image?: string;
    is_active?: boolean;
    orders?: {
        total_content_download: number
        total_amount_spent: number
    };
    contributor:{
        id: number
    }
}

export interface ContributorState {
    isLoading: boolean,
    isError?: boolean,
    contributors: ContributorProps[],
    singleContributor: ContributorProps | null
    errorMsg?: string,
}


//orders
export interface item {
    id: number,
        category: string,
        type: string,
        quantity: string,
        purchase_price: string,
        status: string,
        deliverable?: {
            title: string,
            slug: string,
            description?: string
        },
        assigned_to?: {
            name?: string,
            personnel_name?: string,
            type?: string
        }
}
export interface OrderProps { 
    sku?: string,
    status?: string,
    total_amount?: number,
    date_assigned?: string,
    due_date?: string,
    id: number,
    created_at: string,
    payment_type?: string,
    items?: item[],
    customer?: {
        id: number,
        first_name?: string,
        last_name?: string,
        email?: string,
        phone_number?: string
    }
}


export interface OrderState {
    isLoading: boolean,
    isError?: boolean,
    orders: OrderProps[],
    orderDetail: OrderProps | null
    errorMsg?: string,
}

// asset management
export interface AssetProps {
    id: number,
    category_id?: string,
    title?: string,
    slug?: string,
    description?: string,
    status?: string,
    reason?: string,
    updated_at: string,
    pricing?: string,
    meta?: {
        author?: {
            id: number,
            first_name?: string,
            last_name?: string,
            profile_image?: string
        },
        category: string,
        asset_type?: string,
        images?: {
            id?: number,
            public_url: string,
            cover_image: string,
            private_url?: string
        },
        tags?: {
            id?: number,
            name?: string
        },
        revenue?: {
            total_units?: string,
            total_amount?: string
        }
    }
}

export interface AssetCategoriesProps {
    id: number;
    title: string;
    slug?: string;
    description?: string;
    asset_type: string;
    price?: number;
    is_active?: boolean;
    cover_image?: string
}

export interface AssetFrameProps {
    id: number;
    title: string;
    slug?: string;
    description?: string;
    image_url: string;
    type?: string;
    price?: number;
    is_active?: boolean;
    // cover_image?: string
}

export interface AssetState {
    isLoading: boolean,
    isError?: boolean,
    errorMsg?: string,
    assets: AssetProps[],
    assetsDetail: AssetProps | null,
    categories: AssetCategoriesProps[],
    deleteMsg: string;
    frames: AssetFrameProps[],
    updateFrameStatusMsg: string
}

