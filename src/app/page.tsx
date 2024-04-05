export default function Home() {
  return (
    <div>
      <div className="container min-h-[90px] mx-auto px-10 ">
        <div className="flex flex-col items-center ">
          <p className="bg-gray-300 px-10 py-1.5  mb-4 text-center  mt-10">
            This is a sentenceThis is a sentenceThis is a sentenceThis is a
            sentenceThis is a sentence
          </p>
          <p className="bg-gray-300 px-10 py-1.5  mb-4 text-center">
            This is a sentenceThis is a sentenceThis is a sentenceThis is a
            sentenceThis is a sentenceThis is a sentenceThis is a sentence
          </p>
          <p className="bg-gray-300 px-10 py-1.5  mb-14 text-center">
            This is a sentenceThis is a sentenceThis is a sentenceThis is a
            sentenceThis is a sentence
          </p>
        </div>
        <div className="bg-gray-400 h-64 mb-32 pt-5"></div>
        <div className="flex flex-row gap-12">
          <div className="bg-gray-500 h-80 w-3/6"></div>
          <div className="flex flex-col justify-center  ">
            <p className="bg-gray-300 px-2 py-1 mb-4 w-1/2">
              This is a sentenceThis is a sentenceThis{' '}
            </p>
            <p className="bg-gray-300 px-2 py-1 mb-4">
              This is a sentenceThis is a sentenceThis is a sentenceThis is a
              sentenceThis is a sentence
            </p>
            <p className="bg-gray-300 px-2 py-1 mb-4 w-1/2">
              This is a sentenceThis is a sentenceThis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
