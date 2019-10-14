import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        items: []
      };
  
    }
    collapse (e) {
      if(e.target.classList.contains('collapsed')) {
        e.target.classList.remove('collapsed');
      } else if(!e.target.classList.contains('collapsed')) {
        e.target.classList.add('collapsed');
      }
    }
    changeThis (item) {
      return <p>{item.body.replace(/\n/g, "</p><p>")}</p>;
    }
    dateDiff (publishedDate) {
      var date = new Date(publishedDate);
      var milliseconds = date.getTime();
  
      var date2 = new Date();
      var milliseconds2 = date2.getTime();
      var minus = milliseconds2 - milliseconds;
      return Math.round((minus / (1000 * 3600 * 24)));
    }
  
    componentDidMount(){
        fetch("https://my-json-server.typicode.com/journeymanavi/mock-json-api/posts")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                items: result
              });
              // alert(result);
            },
            (error) => {
              //error condition
             
            }
          )
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
                  {this.changeThis(item)}
                </div>
            </div>
          ))}
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('app'))