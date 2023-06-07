import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsShieldCheck } from "react-icons/bs"
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  useEffect(()=>{
    inputRefs.current[0].focus();
  },[])
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      // Delete value and move focus to the previous input
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = '';
      setOtpValues(newOtpValues);
      inputRefs.current[index - 1].focus();
    }
  };


  return (
    <div className='w-full h-screen bg-blue-400 flex justify-center items-center'>
      <div className='p-12 bg-white rounded-lg flex items-center justify-center flex-col '>
        <div className='bg-blue-400 w-[80px] h-[80px] rounded-full flex items-center justify-center '>
          <BsShieldCheck size={48} />
        </div>
        <div className='text-black'>
          <h2 className='text-center my-4 text-2xl font-medium'>One-Time Password</h2>
          <div className='flex gap-4 my-6'>
            {otpValues.map((value, index) => (

              <input
                className='border w-[80px] h-[80px] rounded-md text-xl text-center appearance-none'
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                value={value}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button className='w-full mt-6 p-3 text-white bg-blue-400 rounded-md font-medium text-xl capitalize'>
            verify code
          </button>

        </div>

      </div>
    </div>
  )
}
