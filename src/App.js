import React, { useEffect, useState } from "react";
import { getSummoner } from "./helpers/getSummoner";

function App() {
  const [summoner, setSummoner] = useState();

  const getInvoker = async () => {
    const data = await getSummoner('malvadeso');
    setSummoner(data);
  }

  useEffect(() => {
    getInvoker();
    console.log(summoner)
  },[]);

  return (
    <div>
      teste
    </div>
  );
}

export default App;
