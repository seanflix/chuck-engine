import bg from './chuck-bg.png'
import icon from './chuck-head.png'
import headicon from './check-engine.png'

import React, { useState, useEffect } from 'react'

function App() {

  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(true)

  const [isAnimating, setIsAnimating] = useState(false)
  const [isAnimatingHead, setIsAnimatingHead] = useState(false)

  const animateHead = () => {
    setIsAnimatingHead(true)
    setTimeout(() => {
      setIsAnimatingHead(false)
    }, 1000);
  }

  const animateButton = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000);
  }

  const generateJoke = () => {
    animateButton()
    setLoading(true)
    fetch('https://api.chucknorris.io/jokes/random')
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.value)
        setLoading(false)
        animateHead()
      })
      .catch((error) => {
        console.error('Error fetching Chuckling Norris:', error)
        setLoading(false)
      });
  }

  useEffect(() => {
    generateJoke()
  }, []);

  return (
    <div className='relative w-full min-h-screen overflow-hidden flex flex-col justify-between items-center bg-amber-100'>
      <div></div>
      <div className='relative w-full max-w-2xl z-10 my-10'>
        <div className='relative flex flex-col z-20'>
          <img className={`z-10 mx-auto px-20 animate__animated ${isAnimatingHead ? 'animate__tada' : 'animate__shakeY'}`} src={icon} alt='icon' />
          <img className='z-20 mx-auto -mt-6 px-6' src={headicon} alt='sub-icon' />
        </div>
        <div className='static z-10 bg-white rounded-3xl px-8 pt-14 pb-14 shadow -mt-8 mx-3'>
          <p className='w-full text-center text-xl sm:text-2xl px-4 sm:px-6 py-5 bg-neutral-200 rounded-2xl font-bold tracking-tight transition-all break-words'>
            { loading ? 'Loading...' : joke }
          </p>
        </div>
        <div className='flex justify-center -mt-8'>
          <button onClick={generateJoke} disabled={loading} className={`bg-amber-400 text-red-800 leading-0 text-xl font-bold px-8 py-4 rounded-2xl shadow hover:scale-105 transition-all duration-100 animate__animated ${isAnimating ? 'animate__headShake' : 'animate__shakeX animate__delay-5s'}`} >
            { loading ? (
              <div className='flex items-center'>
                <span className='-mb-2'>TICKLE ME, NORRIS</span>
                <svg className="animate-spin ml-3 h-5 w-5 text-red-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <span className='-mb-2'>TICKLE ME, NORRIS</span>
            )}
          </button>
        </div>
      </div>
      <div className='relative max-w-2xl z-10 p-3'>
        <div className='flex items-center justify-center space-x-3 mb-2'>
          <a href='https://github.com/seanzki143' target='_new' className='border group hover:bg-red-800 border-red-800 text-xs flex items-center font-bold px-3 py-2 rounded-full'>
            <svg className="h-4 w-4 text-transparent fill-red-800 group-hover:fill-amber-100 mr-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            <p className='text-red-800 group-hover:text-amber-100 -mb-0.5'>Github</p>
          </a>
        </div>
        <p className='text-xs text-center'>
          <strong>Special Thanks to:</strong> <a href='https://api.chucknorris.io/' className='hover:underline'>Chucknorris.io</a>
        </p>
        <p className='text-xs text-center my-1'>
          <strong>Disclaimer:</strong> This website is not affiliated with Chuck Norris, movie or TV companies, their parent entities, or affiliates. All trademarks, copyrights, and content mentioned are purely for humorous entertainment and should not be taken as facts.
        </p>
        <p className='text-xs text-center'>
          © <span className='font-bold'>dev.seanflix</span> - 2023
        </p>
      </div>
      <img className='absolute right-0 bottom-0 opacity-10' src={bg} alt='bg' />
    </div>
  );
}

export default App;
