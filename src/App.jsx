import { Button } from "@/components/ui/button"
import './global.css'
import Header from "./components/header/header"
import React from 'react';

function App() {
  return (
    <>
    <Header/>
    <div className="flex justify-center h-screen items-center">
      <Button>Click me</Button>
    </div>
    </>
  )
}
export default App