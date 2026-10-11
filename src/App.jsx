import React from "react";
import { ShopProvider } from "./Context/ShopContext";
import HomeLayout from "./Components/layout/HomeLayout";

function App() {
  return (
    <ShopProvider>
      <HomeLayout />
    </ShopProvider>
  );
}

export default App;
