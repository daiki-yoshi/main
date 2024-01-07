import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/schedule"
import LeadgeTable from "./pages/LeadgeTable"

export default function App() {
    return (
      <div>
        <BrowserRouter>
          <header class="header">
            <h1 class="title"> site-name </h1>
            <nav class="header-nav-container">
              <ul class="header-nav">
                <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/schedule">schedule</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/leadgeTable">leadgeTable</Link> </li>
              </ul>
            </nav>
          </header>
          <div>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/schedule" element={<Schedule/>} />
              <Route path="/leadgeTable" element={<LeadgeTable/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }