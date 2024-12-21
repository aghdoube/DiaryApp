import React from "react";
import MainLayout from "../Layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <img
          src="/images/error.png"
          alt="error"
          className="w-1/2 max-w-md mb-8"
        />
        <h1 className="text-3xl font-bold " style={{ color: "#ecbe80" }}>
          Something went wrong....
        </h1>
      </div>
    </MainLayout>
  );
};

export default NotFound;
