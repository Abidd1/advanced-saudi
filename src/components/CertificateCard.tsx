import Image from "next/image";

export interface CertificateData {
  name: string;
  idNumber: string;
  employeeNo: string;
  companyName: string;
  certificateNo: string;
  dateOfIssue: string;
  expiryDate: string;
  role: string;
  photoUrl: string;
  qrCodeUrl: string;
}

export default function CertificateCard({ data }: { data: CertificateData }) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[600px] mx-auto my-12">
      {/* --- FRONT PAGE --- */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/40 border border-gray-200">
        
        {/* Header */}
        <div className="flex justify-between items-start pt-4 px-6 pb-2 border-b-2 border-gray-100">
          <div className="flex items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 80H10L50 10Z" stroke="#00A3E0" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M50 30L75 70H25L50 30Z" fill="#00A3E0"/>
            </svg>
            <span className="text-[#00A3E0] font-bold text-sm tracking-wide -ml-1 mt-6">Advanced</span>
          </div>
          
          <div className="text-center flex-1">
            <h2 className="text-[#3b5998] text-3xl font-extrabold tracking-tight">Advanced Inspection</h2>
            <p className="text-black font-bold text-sm tracking-tight mt-1">Dammam - Kingdom of Saudi Arabia</p>
          </div>

          <div className="w-16 h-16 bg-[#3b5998] flex flex-col items-center justify-center text-white font-bold p-1 shrink-0 rounded">
            <div className="flex text-xs space-x-[2px] mb-1">
               {/* Minimal dummy chain link svg */}
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <span className="text-[11px] leading-none tracking-widest">LEEA</span>
          </div>
        </div>

        {/* Info Body */}
        <div className="flex justify-between p-6 pb-2 relative border-b border-gray-200">
          <div className="flex flex-col gap-4 z-10 w-2/3 mt-2 text-[15px]">
            <div className="flex items-baseline">
              <span className="font-bold text-black w-20 shrink-0">Name:</span>
              <span className="font-extrabold text-black uppercase">{data.name}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold text-black w-48 shrink-0 tracking-tight">Iqama / Passport / ID No.:</span>
              <span className="font-bold text-black">{data.idNumber}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold text-black w-28 shrink-0">Employee. No.:</span>
              <span className="font-bold text-black">{data.employeeNo}</span>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="font-bold text-black w-28 shrink-0">Co. Name:</span>
              <span className="font-bold text-black">{data.companyName}</span>
            </div>
          </div>
          
          <div className="absolute right-6 top-4 w-32 h-40 border-2 border-gray-300 bg-gray-100 overflow-hidden shrink-0">
            <Image src={data.photoUrl} alt="Employee Photo" fill className="object-cover" />
          </div>
        </div>

        {/* Lower Info block */}
        <div className="flex justify-between p-4 px-6 items-end">
          {/* QR */}
          <div className="w-20 h-20 bg-gray-100 relative shrink-0">
             <Image src={data.qrCodeUrl} alt="QR Code" fill className="object-contain" />
          </div>
          
          <div className="flex-1 px-4 flex flex-col gap-3">
            <div className="flex justify-between max-w-[250px]">
               <span className="font-bold text-black text-sm">Certificate No.:</span>
               <span className="font-bold text-black text-sm">{data.certificateNo}</span>
            </div>
            <div className="flex justify-between items-end">
               <div className="flex flex-col">
                 <span className="font-bold text-black text-sm mb-1 tracking-tight">Date of Issue:</span>
                 <span className="font-extrabold text-[#c8102e] text-lg leading-none">{data.dateOfIssue}</span>
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-black text-sm mb-1 tracking-tight">Expiry Date:</span>
                 <span className="font-extrabold text-[#c8102e] text-lg leading-none">{data.expiryDate}</span>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-bold text-black text-sm">Examinar:</span>
            {/* Signature Placeholder */}
            <div className="h-12 w-24 relative flex items-center justify-center">
               <span className="text-3xl font-handwriting text-[#3b5998] italic tracking-tighter" style={{fontFamily: 'cursive'}}>H.Cari</span>
            </div>
            <span className="font-bold text-black text-xs">Engr. Muhammad Azam</span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0b1426] py-3 text-center w-full">
          <h3 className="text-white text-2xl font-bold tracking-wide">{data.role}</h3>
        </div>
      </div>

      <div className="my-2 border-b-2 border-dashed border-gray-300 w-full relative">
         <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-gray-50 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Back Page</span>
      </div>

      {/* --- BACK PAGE --- */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/40 border border-gray-200">
        
        {/* Top Dark Banner */}
        <div className="bg-[#0b1426] pt-6 pb-10 px-8 text-center">
          <p className="text-white text-lg font-bold">
            The holder of this card has successfully completed the training session in <br/> {data.role}.
          </p>
        </div>

        <div className="bg-white w-full">
          {/* Validation Header */}
          <div className="text-center pt-8 pb-3 border-b border-gray-400">
            <p className="text-[#c8102e] font-bold text-[15px]">
              To Validate please visit https://advanced-saudi.com/certificates/ or Scan QR Code
            </p>
          </div>
          
          {/* Contact & Logos Body */}
          <div className="flex justify-between items-center py-6 px-4 border-b border-gray-400">
            {/* Left Logos placeholder */}
            <div className="flex gap-2 shrink-0 opacity-80 pl-2">
               <div className="w-10 h-10 bg-red-600/10 rounded-full border border-red-600 flex items-center justify-center text-xs font-bold text-red-600">EAS</div>
               <div className="w-10 h-10 bg-blue-600/10 rounded-full border border-blue-600 flex items-center justify-center text-xs font-bold text-blue-600">GCF</div>
            </div>
            
            {/* Address Center */}
            <div className="text-center flex flex-col items-center flex-1 text-black font-medium text-sm leading-snug">
               <h3 className="text-[#3b5998] text-2xl font-extrabold pb-1">Advanced Inspection</h3>
               <p>P.O.Box 9937, Dammam - 32241-KSA</p>
               <p>Tel.: 013 - 8327055 / 8326461, Fax: 8320838</p>
               <p>E-mail : info@advanced-saudi.com</p>
               <p>www.advanced-saudi.com</p>
            </div>
            
            {/* Right Logos placeholder */}
            <div className="flex gap-2 shrink-0 opacity-80 pr-2">
               <div className="w-10 h-14 bg-blue-900/10 border border-blue-900 flex items-center justify-center text-xs font-bold text-blue-900">UKS</div>
               <div className="w-10 h-10 bg-green-800/10 border border-green-800 flex items-center justify-center text-xs font-bold text-green-800">IAS</div>
            </div>
          </div>
          
          {/* Disclaimer Footer */}
          <div className="p-4 px-6 pb-8 text-center flex flex-col items-center">
            <h4 className="text-[#c8102e] font-bold text-lg border-b-[3px] border-[#c8102e] mb-3 inline-block">Disclaimer</h4>
            <p className="text-gray-700 text-[13px] leading-tight font-medium pb-2 text-justify">
              We hereby declare that the holder of this card was examined in accordance with applicable 
              standards and that results were satisfactory at the time of examination. Advanced Company accepts 
              no liability for any errors committed by the holder of this card while attending the categorized duty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
