import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodcat, setFoodCat] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    console.log("hello", response);
    setFooditem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: "beige" }}>
      <div>
        <Navbar></Navbar>
      </div>

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div
                className="d-flex justify-content-center text-white"
                role="search"
              >
                <input
                  className="form-control me-2 text-white"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ background: "transparent" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300/?fruits"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?pizza"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodcat.length !== 0 ? (
          foodcat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr></hr>
                {fooditem.length !== 0 ? (
                  fooditem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          ?.toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-4"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options?.[0] || []}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No such Data found</div>
                )}
              </div>
            );
          })
        ) : (
          <p>No Food Category is available</p>
        )}
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
