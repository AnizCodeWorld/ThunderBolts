import React from "react";
import { MapPin, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";

const NGOCard = ({ ngo }) => {
  const { ngoDetails } = ngo;

  return (
    <div className='group relative flex flex-col'>
      {/* The main card container */}
      <div className='bg-white border rounded-2xl p-5 border-emerald-600 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500'>
        <div className='flex justify-between items-start mb-6'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors'>
              <span className='text-xs font-bold text-slate-400 group-hover:text-emerald-600'>
                {ngoDetails.ngoName?.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className='flex items-center gap-1.5'>
                <h3 className='font-bold text-slate-900 leading-none'>
                  {ngoDetails.ngoName}
                </h3>
                <CheckCircle2 size={14} className='text-emerald-500' />
              </div>
              <p className='text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1'>
                {ngoDetails.registrationType}
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-4 mb-6'>
          <div className='flex items-center gap-2.5 text-slate-500'>
            <MapPin size={14} className='text-slate-300' />
            <span className='text-xs font-medium truncate'>
              {ngoDetails.address}
            </span>
          </div>
          <div className='flex items-center gap-2.5 text-slate-500'>
            <Users size={14} className='text-slate-300' />
            <span className='text-xs font-medium'>
              Supports {ngoDetails.beneficiaryCapacity} lives daily
            </span>
          </div>
        </div>
      </div>

      {/* Decorative background element for minimal depth */}
      <div className='absolute inset-0 bg-emerald-600 rounded-2xl -z-10 translate-y-1 opacity-0 group-hover:opacity-10 group-hover:translate-y-2 transition-all duration-500'></div>
    </div>
  );
};

export default NGOCard;
