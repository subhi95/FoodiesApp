import { useState, useEffect } from 'react';
import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {

    const [orderData, setOrderData] = useState({})

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/MyOrder_data", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();

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
        fetchMyOrder()
    }, [])

    useEffect(() => {
        console.log("orderData:", orderData);
    }, [orderData]);


    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data ? orderData.order_data.slice(0).reverse().map((item, index) => (
                        <div key={index}>
                            {item.Order_date ? (
                                <div className='m-auto mt-5'>
                                    {item.Order_date}
                                    <hr />
                                </div>
                            ) : (
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{item.img}</span>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <span className='m-1'>{item.Order_date}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )) : (
                        <p>No order data available.</p>
                    )}
                </div>
            </div>


            <div>
                <Footer></Footer>
            </div>

        </>
    )
}



//  const fetchMyOrder = async () => {
//     console.log(localStorage.getItem('userEmail'))
//     await fetch("http://localhost:4000/api/MyOrder_data", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: localStorage.getItem('userEmail')
//         })
//     }).then(async (res) => {
//         let response = await res.json()
//         await setorderData(response)
//     })
// }

{/* <div className='container'>
                <div className='row'>

                    {Object.keys(orderData).length !== 0 ? Array(orderData).map((data) => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div> */}
