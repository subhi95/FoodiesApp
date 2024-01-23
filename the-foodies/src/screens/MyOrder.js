import { useState, useEffect } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/MyOrder_data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail"),
                }),
            });

            const data = await response.json();
            console.log(data.orderData.order_data);

            // Check if orderData exists and has order_data property
            if (data.orderData) {
                setOrderData(data.orderData);
            } else {
                setOrderData([]); // No data available
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // useEffect(() => {
    //     console.log("orderData:", orderData);
    // }, [orderData]);

    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="container">
                <div className="row">
                    {orderData && orderData.order_data ? (
                        orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((nestedArray, index) => (
                                <div key={index}>
                                    {/* Assuming the nested array has Order_date property */}
                                    {nestedArray[0]?.Order_date ? (
                                        <div className="m-auto mt-5">
                                            {nestedArray[0].Order_date}
                                            <hr />
                                        </div>
                                    ) : (
                                        nestedArray.map((item, innerIndex) => (
                                            <div key={innerIndex} className="col-12 col-md-6 col-lg-3">
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img
                                                        src={item.img}
                                                        className="card-img-top"
                                                        alt="..."
                                                        style={{ height: "120px", objectFit: "fill" }}
                                                    />
                                                    <div className="card-body">


                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                            <span className="m-1">{item.img}</span>
                                                            <span className="m-1">{item.qty}</span>
                                                            <span className="m-1">{item.size}</span>
                                                            <span className="m-1">{item.Order_date}</span>
                                                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ))
                    ) : (
                        <p>No order data available.</p>
                    )}
                </div>
            </div>

            <div>
                <Footer></Footer>
            </div>
        </>
    );
}
