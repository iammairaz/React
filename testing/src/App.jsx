import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { CountContext } from "./context";
import { RecoilRoot,useRecoilState, useRecoilValue } from "recoil";
import { countAtom } from "./store/atoms/count";

function App() {
  // we will use recoil now for state management
  // const [count, setCount] = useState(0);

  return (
    // <div>
    //   <CountContext.Provider value={count}>
    //     <Count setCount={setCount} />
    //   </CountContext.Provider>
    // </div>
    <div>
      <RecoilRoot>
        <Count/>
      </RecoilRoot>      
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRender />
      <Buttons/>
    </div>
  );
}

function CountRender() {
  //const count = useContext(CountContext);
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}
function Buttons() {
  const [count,setCount] = useRecoilState(countAtom);
  // const count = useContext(CountContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}

export default App;
