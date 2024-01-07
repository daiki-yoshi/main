import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/schedule"
import LeadgeTable from "./pages/LeadgeTable"

export default function App() {
    return (
      <div>
        <BrowserRouter>
          <header>
            <h1 class="title"> 海外サッカー情報局 </h1>
            <nav class="header-nav-container">
              <ul class="header-nav">
                <li class="nav-item"><Link to="/">Home</Link></li>
                <li class="nav-item"><Link to="/schedule">Schedule</Link></li>
                <li class="nav-item"><Link to="/leadgeTable">LeagueTable</Link> </li>
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