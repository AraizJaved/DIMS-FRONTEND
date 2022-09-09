import './App.css';
import MainComponent from './Components/mainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "~bootstrap/scss/bootstrap";

const RenderMain=()=>{
  return(
    <div >
      <MainComponent/>
    </div>
  )
}

function App() {
  return (
    <div >
     <RenderMain/>
    </div>
  );
}

export default App;
