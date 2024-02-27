//Step 2: API

import Form from "./components/Form.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto">
          <Form />
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
