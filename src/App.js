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
  },[]);

  return (
    <div>
      {summoner.puuid}
    </div>
  );
}

export default App;
