import { useMemo, useState } from 'react';
import { findPrime } from '../utils/helper';

const Demo = () => {
    const [text, setText] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    //const prime = findPrime(text);
    const prime = useMemo(() => findPrime(text), [text]);

    return (
        <div className={'m-4 p-2 w-96 h-96 border border-gray-200 rounded-lg' + 
                (isDarkTheme ? ' bg-gray-800 text-white' : '')
            }
        >
            <div>
                <button 
                    onClick={() => setIsDarkTheme(!isDarkTheme)} 
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                    Toggle
                </button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className='border border-gray-300 px-2 w-72 rounded-lg'
                    placeholder="Type something..."
                />
            </div>
            <div>
                <h1 className='mt-4 font-bold text-xl'>nth prime: {prime}</h1>
            </div>
        </div>
    )
}

export default Demo