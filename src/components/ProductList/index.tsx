import { instance } from "../../axios/config";
import { ProductContext } from "../../context/ProductReducer";
import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const ProductList = () => {
    // const { products, fetchProducts, isLoading, error, addProduct, removeProduct, updateProduct } =
    //     useContext(ProductContext);
    const { state, dispatch } = useContext(ProductContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              // call api
              const data = await instance.get(`/products`);
              console.log('API Response:', data); // Thêm dòng này để kiểm tra dữ liệu trả về từ API
              // rerender
              dispatch({ type: "FETCH_PRODUCTS", payload: data });
            } catch (error: any) {
              console.error('API Error:', error); // Thêm dòng này để kiểm tra lỗi nếu có
            } finally {
              // You can add additional code here if needed
            }
          };
        fetchProducts();
    }, []);
    const addProduct = async (product: any) => {
        try {
            const data = await instance.post(`/products`, product);
            dispatch({ type: "ADD_PRODUCT", payload: data });
        } catch (error: any) {
        } finally {
        }
    };
    const removeProduct = async (product: any) => {
        try {
            await instance.delete(`/products/${product.id}`);
            dispatch({ type: "DELETE_PRODUCT", payload: product.id });
        } catch (error: any) {
        } finally {
        }
    };
    const updateProduct = async (product: any) => {
        try {
            const data = await instance.put(`/products/${product.id}`, product);
            dispatch({ type: "UPDATE_PRODUCT", payload: data });
        } catch (error: any) {
        } finally {
        }
    };

    if (state.isLoading) return <Skeleton count={3} height={35} />;
    if (state.error) return <div>{state.error}</div>;
    return (
        <div>
            {state?.products?.map((item: any) => {
                return <div key={item.id}>{item.name}</div>;
            })}

            <button onClick={() => addProduct({ name: "Product C" ,id:3})}>
                Add 
            </button>

            <button
               
                onClick={() => updateProduct({ name: "Product C updated ", id: 3 })}
            >
                Update 
            </button>
            < button  onClick={() => removeProduct({ id: 3 })}>
                Delete 
            </button>
        </div>
    );
};

export default ProductList;
