import React from "react";
import { Container } from "@mui/material";

export const ReadyToBook: React.FC = () => {
  return (
    <div className="w-full flex justify-center lg:py-8">
      <Container className="bg-gradient-to-r from-[#d8d6d7] to-[#d6d6d6] flex justify-center py-8 lg:rounded-xl">
        <div className="container px-2 flex justify-between items-center">
          <div className="font-bold text-xl">Ready to book?</div>
          <button className="text-sm lg:text-base bg-[#FDB813] hover:bg-yellow-400 text-black font-semibold w-28 lg:w-36 h-12 rounded-lg border-yellow-500 z-10" onClick={()=>{
            window.location.href = '/home'
          }}>
            BOOK NOW
          </button>
        </div>
      </Container>
    </div>
  );
};
