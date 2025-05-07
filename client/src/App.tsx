import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, ToasterProvider } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import MinesweeperPage from "./pages/MinesweeperPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MinesweeperPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <Router />
        <Toaster />
      </ToasterProvider>
    </QueryClientProvider>
  );
}

export default App;
