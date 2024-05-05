import Image from 'next/image';

import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-14 gap-y-28">
        <div className="flex flex-row">
          <div className="max-w-[700px]">
            <div className="flex flex-row gap-x-4 mt-10 ">
              <div>
                <Image
                  src="/images/Group15.png"
                  alt="picture"
                  width={170}
                  height={150}
                />
              </div>
              <div>
                <Image
                  src="/images/Group16.png"
                  alt="picture"
                  width={170}
                  height={150}
                />
              </div>
              <div>
                <Image
                  src="/images/Group18.png"
                  alt="picture"
                  width={155}
                  height={150}
                />
              </div>
            </div>
            <div className="mt-20 text-6xl font-semibold">BUDGET PLANNER</div>
            <div className="mt-20 text-lg">
              Streamline your finances with Budget Planner: automated updates,
              intelligent categorization, and precision in every budget
              scenario.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14 ">
              <div className="relative  px-3 lg:mb-0 ">
                <div className="absolute right-5 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>

                <h5 className="mb-2 text-2xl font-bold text-primary">
                  1 Database
                </h5>
                <h6 className="mb-0 font-normal dark:text-neutral-50">
                  To store all data
                </h6>
                <div className="absolute right-0 top-0 hidden  w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-900 to-transparent opacity-25 dark:via-neutral-900 lg:block"></div>
              </div>
              <div className="relative  px-3 lg:mb-0">
                <h5 className="mb-2 pl-3 text-2xl font-bold text-primary">
                  2 Steps
                </h5>
                <h6 className="mb-0 font-normal dark:text-neutral-50">
                  To create a plan
                </h6>
                <div className="absolute right-5 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-900 to-transparent opacity-25 dark:via-neutral-900 lg:block"></div>
              </div>
              <div className="relative mt-[-8px] lg:mb-0">
                <div className="flex flex-row items-center">
                  <div className="text-5xl font-bold text-primary">∞</div>
                  <h5 className="mb-2 text-2xl font-bold text-primary pt-1">
                    Ways
                  </h5>
                </div>
                <h6 className="mb-0 font-normal dark:text-neutral-50">
                  To customize
                </h6>
              </div>
            </div>

            <div className="flex flex-row mt-10  gap-4">
              <Button className="text-3xl font-semibold py-7">Start Now</Button>
              <Button className="bg-black text-3xl font-semibold hover:bg-gray-300 hover:text-gray-900 py-7">
                Sign In
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Image
            src="/images/Group23.png"
            alt="picture"
            width={600}
            height={600}
            quality={100}
          />
        </div>

        <div className="max-w-[700px] ">
          <div className="max-w-[500px] text-4xl font-bold mb-5 ">
            Automated Budget Plan Variations for Easy Management
          </div>
          <div className="max-w-[550px] text-lg">
            Our Budget Planner application automates the updates of essential
            components, reducing human errors and ensuring accurate budget
            planning. With our intelligent categorization system, budget items
            are accurately classified based on their significance and
            applicability to different budget scenarios.
          </div>
          <div className="flex flex-row mt-8 gap-10">
            <div>
              <Image
                src="/images/zap.png"
                alt="picture"
                width={30}
                height={30}
                quality={100}
              />
              <div className="text-lg font-semibold mt-3 mb-2">Automated</div>
              <div>
                Generate budget plan variations with ease and accuracy using our
                automated system.
              </div>
            </div>
            <div>
              <Image
                src="/images/barChart.png"
                alt="picture"
                width={30}
                height={30}
                quality={100}
              />
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

        <div>
          <Image
            src="/images/Group20.png"
            alt="picture"
            width={700}
            height={700}
            quality={100}
          />
        </div>
      </div>
    </>
  );
}
