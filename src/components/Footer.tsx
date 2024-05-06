import { cn } from '@/lib/utils';

import Logo from './ui/logo';
const Footer = () => {
  return (
    <footer
      className={cn(
        'w-full min-h-[72px] md:px-10 pt-10 pb-5 absolute bottom-0',
        'flex items-center justify-center',
      )}
    >
      <aside className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left max-w-[1200px]  ">
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
