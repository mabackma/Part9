import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [greeting, setGreeting] = useState<string>("hello world!");
  
  return (
    <div>
      {greeting}
    </div>
  );
};

export default App;