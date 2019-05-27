import React from 'react';
import NotFound from '../NotFound/NotFound';
import './Home.styl';
class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    console.log(<NotFound/>)
    console.log(<NotFound><div>A组件包裹的内容</div></NotFound>)
    return(
      <div className="home">
        这是Home组件

      </div>
    )
  }
}

export default Home;