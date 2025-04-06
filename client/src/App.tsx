import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";
import ProgressBar from "@/components/ProgressBar";
import CustomCursor from "@/components/CustomCursor";

function App() {
  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ['/api/auth/status'],
    queryFn: async () => {
      const res = await fetch('/api/auth/status', {
        credentials: 'include',
      });
      return res.json();
    }
  });

  return (
    <>
      <ProgressBar />
      <CustomCursor />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/admin">
          {authStatus?.authenticated && authStatus?.isAdmin ? <Admin /> : <Login />}
        </Route>
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
      
      <Toaster />
    </>
  );
}

export default App;
