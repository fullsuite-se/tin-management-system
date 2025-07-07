import './App.css'
import Dashboard from "./components/dashboard/Dashboard.tsx";

function App() {

  return (
    <>
        <Dashboard name={'Administrator'} email={'admin@getfullsuite.com'} avatar={'/sample.svg'} onLogout={function (): void {
            throw new Error('Function not implemented.');
        }} />
    </>
  )
}

export default App
