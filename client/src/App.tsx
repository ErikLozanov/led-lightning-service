import { useEffect, Suspense, lazy } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import { Routes, Route } from "react-router-dom";

// --- LAZY LOADED PAGES ---
const Home = lazy(() => import("./pages/Home/Home"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const Testimonials = lazy(
    () => import("./pages/Testimonials/Testimonials")
);
const ProjectDetails = lazy(
    () => import("./pages/ProjectDetails/ProjectDetails")
);
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const PageLoader = () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00f3ff]"></div>
    </div>
);

function App() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true, mirror: false, offset: 100 });
    }, []);

    return (
        <div className="antialiased">
            <ScrollToTop />
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#1e293b",
                        color: "#fff",
                        border: "1px solid #334155",
                    },
                    success: {
                        iconTheme: {
                            primary: "#00f3ff",
                            secondary: "black",
                        },
                        style: {
                            border: "1px solid #00f3ff",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "white",
                        },
                        style: {
                            border: "1px solid #ef4444",
                        },
                    },
                }}
            />
            <Navbar />

            <div className="pt-20">
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route
                            path="/testimonials"
                            element={<Testimonials />}
                        />
                        <Route
                            path="/project/:slug"
                            element={<ProjectDetails />}
                        />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>

            <CookieConsent />
        </div>
    );
}

export default App;
