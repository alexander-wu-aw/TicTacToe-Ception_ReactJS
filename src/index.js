import React from 'react';
import ReactDOM from 'react-dom';
import Center from 'react-center';
import './index.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return(
        <button style={{height:50,width:50}} className="square" onClick={props.onClick}>
        {props.value}
        </button>
    )
}
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        }
    }
    giveParent = () => {
      this.props.callbackFromParent()
    }

    giveParent2 (data1, data2) {
      this.props.callbackFromParent2(data1, data2)
    }

    handleClick(i){
        const squares1 = this.state.squares.slice();
        if ( squares1[i]){
            return
        }
        squares1[i] = this.props.fromParent ? 'X' : 'O';
        this.setState({squares: squares1, xIsNext : !this.props.fromParent,});
        this.giveParent();
    }
    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }
    render() {
      const winner = calculateWinner(this.state.squares);
      if(winner){
          this.giveParent2(this.props.value, winner)
        return(
          <div className="done" >
            <font size="100">
              {winner}
            </font>
          </div>
        );
      }
      else{
      return (
        <div className ="done">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
      }
    }
  }
    
  class UltimateBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: Array(9).fill(null),
            next: true,
            clicked: false
        };
    }
    myCallback = (datafromChild) => {
      if (this.state.next){
        this.setState({next:false})
      }
      else{
        this.setState({next:true})
      }
    }
    myCallback2 = (data1, data2) => {
      const newboard = this.state.board.slice();
      if (newboard[data1] != data2){
        newboard[data1] = data2;
        this.setState({board:newboard});
        console.log(this.state.board);
      }
      else{
        return
      }
    }
    renderBoard(i) {
      return <Board value = {i} callbackFromParent = {this.myCallback} fromParent = {this.state.next} callbackFromParent2 = {this.myCallback2} />
    }
    reset(){
      window.location.reload()
    }
    render() {
      const realwinner = calculateWinner(this.state.board);
      let status;
      if(realwinner){
          return(
            <div className="page">
              <div className="title">{"Tic-Tac-Toe-Ception"} </div>
              <div className="name">{"Created by Alexander Wu"} </div>
            <div className="congrats">
            {"Congratulations!"}
            </div>
            <div className="won">
            {"Player \"" + realwinner + "\" wins!"}
            </div>
            <Reset onClick={() => this.reset()} />;
            </div>
          )
      }
      else{
          status = 'Next player: ' + (this.state.next ? 'X' : 'O');
      
      return (
        <div className="page">
          <div className="title">{"Tic-Tac-Toe-Ception"} </div>
          <div className="name">{"Created by Alexander Wu"} </div>
          <div className="status">{status} </div>

          <div  display = "inline-block">
          <div className="UltimateBoard">
          <div className="board-row">
          <div class = "board0">{this.renderBoard(0)}</div>
          <div class = "board1">{this.renderBoard(1)}</div>
          <div class = "board2">{this.renderBoard(2)}</div>
          </div>
          <div className="board-row">
            <div class = "board0">{this.renderBoard(3)}</div>
            <div class = "board1">{this.renderBoard(4)}</div>
            <div class = "board2">{this.renderBoard(5)}</div>
          </div>
          <div className="board-row">
          <div class = "board0">{this.renderBoard(6)}</div>
          <div class = "board1">{this.renderBoard(7)}</div>
          <div class = "board2">{this.renderBoard(8)}</div>
          </div>
          </div>
          </div>
        </div>
      );
      }
    }
  }
//window.location.reload()
function Reset(props){
  return(
    <button style={{height:50,width:200}} className="reset" onClick={props.onClick}>
            {"Play Again"}
    </button>
)
}


  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <UltimateBoard />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  
  
  // ========================================
  
  ReactDOM.render(
    <Center>
      <Game />
    </Center>,
    document.getElementById('root')
  );
  

/*
  this.state.board.slice().toString()


  myCallback2 = (data1, data2) => {
    const newboard = this.state.board.slice();
    if (newboard[data1] != data2){
      newboard[data1] = data2.toString();
     this.setState({board:newboard});
    }
    else{
      return
    }
  }

  myCallback2 = (data1, data2) => {
        testboard[data1] = data2.toString();
        console.log(testboard[data1]);
        console.log(data2.toString());
        

    }


    if(this.state.clicked){
        window.location.reload()
      }
      else{
        this.setState({clicked:true})
      }
  */
