import './App.css'
import Header from './components/header/Header.tsx';

function App() {

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            <div className="max-w-7xl mx-auto p-3 space-y-3">
                <Header name={'Administrator'} email={'admin@getfullsuite.com'} avatar={''} onLogout={function(): void {
                      throw new Error('Function not implemented.');
                  } } />
            </div>
        </div>
    </>
  )
}

export default App
