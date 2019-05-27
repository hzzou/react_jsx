import React, { useState } from 'react';
import './HookCom.styl';

function HookCom(){

  const [count, setCount] = useState(0);

  return(
    <div className="hook-com">
      <p>点击次数{count}</p>
      <button onClick={()=>setCount(count+1)}>点击</button>
    </div>
  )
}

export default HookCom;