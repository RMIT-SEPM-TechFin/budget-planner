import Image from 'next/image';

import HomePageActionButton from '@/components/HomePageActionButton';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-14 gap-y-28">
        <div className="flex flex-row items-center">
          <div className="max-w-[700px] space-y-10">
            <div className="flex flex-row gap-x-4 mt-10 ">
              <Button className="border-rose-500  text-black bg-white border-2 flex flex-row gap-2 pointer-events-none items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-square-code"
                >
                  <path d="M10 9.5 8 12l2 2.5" />
                  <path d="m14 9.5 2 2.5-2 2.5" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                </svg>
                Automated
              </Button>
              <Button className="border-rose-500 text-black active:hover:bg-white  bg-white border-2 flex flex-row gap-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Visualizable
              </Button>
              <Button className="border-rose-500 text-black active:text-white bg-white border-2 hover:text-white flex flex-row gap-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield-check"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Error-free
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="text-6xl font-bold">BUDGET PLANNER</h1>
              <div className="text-lg">
                Streamline your finances with Budget Planner: automated updates,
                intelligent categorization, and precision in every budget
                scenario.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-1 justify-between">
                <h5 className="text-2xl font-bold text-primary">1 Database</h5>
                <h6 className="font-normal dark:text-neutral-50">
                  To store all data
                </h6>
              </div>
              <div className="flex flex-col gap-1 justify-between">
                <h5 className="text-2xl font-bold text-primary">2 Steps</h5>
                <h6 className="font-normal dark:text-neutral-50">
                  To create a plan
                </h6>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between">
                  <h5 className="text-2xl font-bold text-primary flex flex-row gap-1 items-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fa0000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-infinity"
                    >
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
                    </svg>
                    Ways
                  </h5>
                </div>
                <h6 className="font-normal dark:text-neutral-50">
                  To customize
                </h6>
              </div>
            </div>

            <div className="flex flex-row mt-10 gap-8">
              <HomePageActionButton />
            </div>
          </div>
        </div>

        <Image
          src="/images/Group23.png"
          alt="picture"
          width={600}
          height={600}
          quality={100}
          className="drop-shadow-lg"
        />

        <Image
          src="/images/Group20.png"
          alt="picture2"
          width={700}
          height={700}
          quality={100}
          className="drop-shadow-lg"
        />

        <div className="flex justify-center flex-col">
          <div className="max-w-[500px] text-4xl font-bold mb-5 ">
            Easy Management with Budget Plan
          </div>
          <div className="max-w-[550px] text-lg">
            Our Budget Planner automates component updates, reducing errors and
            ensuring accurate planning. Intelligent categorization accurately
            classifies items based on significance
          </div>
          <div className="flex flex-row mt-8 gap-10">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fa0000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-zap"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
              <div className="text-lg font-semibold mt-3 mb-2">Automated</div>
              <div>
                Generate budget plan variations with ease and accuracy using our
                automated system.
              </div>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fa0000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bar-chart-big"
              >
                <path d="M3 3v18h18" />
                <rect width="4" height="7" x="7" y="10" rx="1" />
                <rect width="4" height="12" x="15" y="5" rx="1" />
              </svg>
              <div className="text-lg font-semibold mt-3 mb-2">
                Visualizable
              </div>
              <div>
                Generate budget plan variations with ease and accuracy using our
                automated system.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
