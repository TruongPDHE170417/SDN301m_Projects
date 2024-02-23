import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/router';

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
