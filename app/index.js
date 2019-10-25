import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import parse from 'html-react-parser';


class App extends React.Component {
    constructor(props){
      super(props);
        this.state = {
        items: []
      };
    } 
    
    collapse (e) {
      if(e.target.classList.contains('collapsed')){
        e.target.classList.remove('collapsed');
      } else if(!e.target.classList.contains('collapsed')){
        e.target.classList.add('collapsed');
      }
    }
   
    dateDiff (publishedDate) {
      var date = new Date(publishedDate);
      var milliseconds = date.getTime();
      var date2 = new Date();
      var milliseconds2 = date2.getTime();
      var minus = milliseconds2 - milliseconds;
      return Math.round((minus / (1000 * 3600 * 24)));
    }
  
    changeThis (item) {
      var str = item.body;
      var ar = str.split('\n');
      var html = "";
      for(var i =0; i<ar.length; i++){
       html += '<p>'+ ar[i] + '</p>';
      }
      return html;
    }

    componentDidMount(){   
        axios.get(`https://my-json-server.typicode.com/journeymanavi/mock-json-api/posts`)
        .then(res => {
          const items = res.data;
          this.setState({ items });    
            console.log("success");//on success
            }).catch((error)=>{
              console.log("Error"); //on error
            });
    }

    render() {
     // console.log(this.state)
      return (
        <div className="App">
          {this.state.items.map(item => (
            <div key={item.id} >
                <div className='card-image-container'>
                    <img src={item.bannerImage} />
                    <h1 className="card-title">{item.title}</h1>
                    <span className="published-on">{this.dateDiff(item['published-on'])} days ago</span>
                </div>
                <div className="collapse" onClick={(e)=> this.collapse(e)}></div>
                <div className="description p-hidden">
                {parse(this.changeThis(item))}
                </div>
            </div>
          ))}
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('app'))