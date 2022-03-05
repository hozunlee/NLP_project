import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { wishListState } from "state/atom";
import { userInfoState } from "state/atom";
import HeartImg from "components/img_src/heart2.png";

const WishList = ({ setOpen, asyncGetHotels }) => {
    const userInfo = useRecoilValue(userInfoState);
    const wishList = useRecoilValue(wishListState);

    const history = useHistory();
    const handlehHeartChange = async (user_id, hotel_id) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API}/wish-list/${user_id}/${hotel_id}`
            );
            asyncGetHotels();
        } catch (e) {
            console.error(e);
        }
    };

    const item = wishList.length ? (
        wishList.map((item) => {
            return (
                <>
                    <div className="mb-3.5">
                        <div className="card card-side h-48 bg-base-100 shadow-xl h-45">
                            <img
                                className="max-w-[40%] cursor-pointer"
                                src={item.hotel_img_url}
                                onClick={() => {
                                    history.push(`/hotel/${item.hotel_id}`);
                                    setOpen(false);
                                }}
                                alt="hotel_img"
                            />
                            <div className="justify-between card-body p-4">
                                <div
                                    className="text-2xl font-bold hover:text-yellow-400 hover:shadow-sm"
                                    onClick={() => {
                                        history.push(`/hotel/${item.hotel_id}`);
                                        setOpen(false);
                                    }}
                                >
                                    <h2 className="card-title">
                                        {item.hotel_name}
                                    </h2>
                                    <span className="badge text-sm">
                                        {item.region}
                                    </span>
                                </div>

                                <div className="justify-end card-actions">
                                    <button
                                        class="btn btn-sm btn-primary"
                                        onClick={() =>
                                            window.open(
                                                item.hotel_url,
                                                "_blank"
                                            )
                                        }
                                    >
                                        예약하기
                                    </button>
                                    <button
                                        className="btn btn-sm btn-square btn-outline mr-2 bg-inherit"
                                        onClick={() => {
                                            handlehHeartChange(
                                                userInfo.id,
                                                item.hotel_id
                                            );
                                        }}
                                    >
                                        <img
                                            className="w-5 h-5"
                                            src={HeartImg}
                                            name="like"
                                            alt="like-btn"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        })
    ) : (
        <div className="text-gray-400 font-bold">No data</div>
    );
    return <>{item}</>;
};

export default WishList;