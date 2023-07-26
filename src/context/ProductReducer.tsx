import React, { createContext,useReducer } from "react";
import { produce } from "immer";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext({} as any);

type ProductProviderProps = {
    children: React.ReactNode;
}
const initialState = {
    products: [],
    isLoading:false,
    error:"",
};
const ProductProvider = ({ children }:ProductProviderProps) => {
    const [state, dispatch] = useReducer(produce(productReducer), initialState);
    return (
        <ProductContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider

