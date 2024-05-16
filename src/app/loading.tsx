import { LoaderCircle } from 'lucide-react';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <LoaderCircle size={64} className="animate-spin stroke-primary" />
    </div>
  );
};

export default Loading;
