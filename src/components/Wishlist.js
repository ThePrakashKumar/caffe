import "./Wishlist.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { WishlistContext } from "../contexts/WishlistContext";
import WishlistCard from "./WishlistCard";
import EmptyWishlist from "./EmptyWishlist";

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const { userId, token } = useContext(AuthContext);
    const { state, dispatch: wishlistDispatch } = useContext(WishlistContext);

    // load data from the server
    const getWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.wishlist.wishlistItems,
                    },
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete product from the wishlist

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div>
            {loading ? (
                <p>loading</p>
            ) : state[0] ? (
                state.map((item) => {
                    return <WishlistCard product={item} />;
                })
            ) : (
                <EmptyWishlist />
            )}
        </div>
    );
};

export default Wishlist;
